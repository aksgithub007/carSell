import axios from "axios";
import { cookies } from "next/headers";
import Button from "./Components/Forms/ButtonSection";
export const getUser = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  try {
    const response = await axios.get("http://localhost:3000/api/user/getUser", {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    return await response.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function Home() {
  const currentUser = await getUser();
  // console.log(currentUser);
  return (
    <>
      <h1>My Name is {currentUser.name}</h1>
      <Button title={"logout"} />
    </>
  );
}
