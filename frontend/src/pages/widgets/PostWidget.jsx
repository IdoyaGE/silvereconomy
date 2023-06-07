//Componente post
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
//Estructura del componente post
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  //para controlar la visibilidad de los comentarios
  const [isComments, setIsComments] = useState(false);
  //HOOKS para enviar acciones a la data, para acceder al estado de la app, para otener el token del usuario y su ID si ha iniciado sesión
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  //Likes del post
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  //Estilos MUI
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  //Envia solicitud PATCH cuando el usuario hace clic en me gusta
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3000/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }), //string en formato JSON
    });
    //post actualizado
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
  //devuelve el post con todos sus elementos, al hacer click en comentarios se muestran
  return (
    <WidgetWrapper m='2rem 0'>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width='100%'
          height='auto'
          alt='post'
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3000/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap='0.3rem'>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt='0.5rem'>
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
