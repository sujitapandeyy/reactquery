import axios from "axios";

const herosApi = axios.create({
    baseURL: "http://localhost:3000"
});

export const getHeros = async () => {
    const response = await herosApi.get("/heros");
    return response.data;
}

export const addHeros = async (hero) => {
    const response = await herosApi.post("/heros", hero);
    return response.data;
}

export const updateHeros = async (hero) => {
    const response = await herosApi.patch(`/heros/${hero.id}`, hero);
    return response.data;
}

export const deleteHeros = async ({id}) => {
    const response = await herosApi.delete(`/heros/${id}`);
    return response.data;
}

export default herosApi;
