//a component for showing data

const ShowDataComponent = (props: {text: string}) => {
    
    
    return (
        <div>
            <h1>{props.text}</h1>
        </div>
    );
};

export default ShowDataComponent;