interface HeaderProps {
    name: string;
    buttonComponent?: any;
    isSmallText?: boolean;
}


const Header = ({name, buttonComponent, isSmallText = false}: HeaderProps) => {
    return (
        <div className={"pb-6 pt-6 lg:pb-4 lg:pt-8"}>

            <h1 className={`${isSmallText ? "text-lg": "text-2xl"} font-semibold`}>{name}</h1>
            {buttonComponent}
        </div>
    )
}

export default Header;