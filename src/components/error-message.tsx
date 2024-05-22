import { Typography } from "@mui/joy";

export default function ErrorMessage({error}: {error: string | undefined}){
    if(!error) return null
    return <Typography color="danger" level="body-xs" >{error}</Typography>
}