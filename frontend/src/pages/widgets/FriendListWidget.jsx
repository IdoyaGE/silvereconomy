//COMPONENTE VOLUNTARIOS (Librería MUI)
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
//HOOKS
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
//Definimos la lista de voluntarios con el prop del id de usuario
//Utilizamos el HOOK useTheme de MUI para obtener los colores del tema
const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  //Llamada a la API para ontener la lista de voluntarios
  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3000/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data })); //almacenamos los voluntarios en la data
  };
  //HOOK useEffect para llamar a la función getFriends al montar el componente
  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //Nos devuelve la lista de voluntarios en un contenedor de columna eon espaciado
  //Mapeamos Friends y mostramos la info con sus elementos
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant='h5'
        fontWeight='500'
        sx={{ mb: "1.5rem" }}
      >
        Lista de voluntarios
      </Typography>
      <Box display='flex' flexDirection='column' gap='1.5rem'>
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.preferences}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
