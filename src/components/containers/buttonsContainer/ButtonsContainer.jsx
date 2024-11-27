const ButtonsContainer = ({ children }) => {
    return (
        <div className='flex justify-between'>
            {children}
        </div>
    );
};

export default ButtonsContainer;