import { useRouter } from "next/dist/client/router"


const navigateToDashboard = () => {
    const router = useRouter();
    router.push("/dashboard/");
}

export default navigateToDashboard

