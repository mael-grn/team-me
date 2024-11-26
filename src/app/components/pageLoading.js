import LordIcon from "@/app/components/lordIcon";

export default function PageLoading() {
    return (
        <div style={
            {
                position: "fixed",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                top: 0,
                left: 0,
                backgroundColor: "white"
            }
        }>
            <LordIcon iconName={"loader-black"} animationType={"loop"}/>
        </div>
    )
}