
export default function Box(props) {
    const style = {
        width: "15%",
        height: "70px",
        backgroundColor: "#efefef",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        fontSize: "2em",
        borderBottom: '2px solid #ccc'
    };

    const styleMap = {
        "0": "",
        "1": "right",
        "2": "wrong",
        "3": "wrong-place"
    };

    return (
        <div style={style} className={styleMap[props.result]}>
            {props.value ? props.value : ''}
        </div>
    )
}