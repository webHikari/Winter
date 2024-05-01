import Header from "@widgets/Header/Header";
import Button from "@shared/Button/Button";

export default function Error404() {
    return (
        <>
            <Header />
            <p>404 page, leave it.</p>
            <Button value="hello" onClick={() => console.log("click")} styleType="Button2"/>
        </>
    );
}
