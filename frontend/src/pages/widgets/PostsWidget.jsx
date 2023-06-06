//COMPONENTE POSTS de un usuario específico
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
//Componete con dos propiedades para indicar los posts de un usuario en su perfil
const PostsWidget = ({ userId, isProfile = false }) => {
  //HOOKS: envío de acciones a data, estado de la aplicación, obtener posts y token del usuario
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  //Solicitud GET al servidor para obtener todos los posts
  const getPosts = async () => {
    const response = await fetch("http://localhost:3000/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  //Solicitud GET al servidor para obtener los posts de un usuario específico
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3000/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  //Función useEffect para que se realicen solo una vez las solicitudes cuando se cargue el componente
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //Mapeamos los posts y los mostramos
  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
