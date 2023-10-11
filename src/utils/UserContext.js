import { createContext } from "react";

const UserContext = createContext({
    user: {
        name: "John Cena",
        email: "abc@gmail.com"
    }
})

export default UserContext;