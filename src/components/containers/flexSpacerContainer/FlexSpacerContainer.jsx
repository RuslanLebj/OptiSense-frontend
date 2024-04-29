const FlexSpacerContainer = ({ children }) => {
    return (
        <div className="flex justify-between m-5 gap-10">
            {children}
        </div>
    );
};

export default FlexSpacerContainer;