import { useRouter } from "next/router";

module.exports = function Id()
{
    const router = useRouter();

    const {pid} = router.query;

    return (<div>Producto n° {pid}</div>)
}