
export const ButtonForAll = (props) => {
    const {title, functionCallBack} = props;
    return(
        <>
            <button onClick={functionCallBack} className="upper button-for-all"><span className="span-button"></span>{title}</button>
        </>
    )
}