import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import './BaseButton.scss'

interface IBaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title?: string ;
    disabled?: boolean;
    fill?: string;
    className?: string;
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
  }

const BaseButton: FC<IBaseButtonProps> = ({...props}) => {
    return (
        <button className={`baseButton ${props.className}`} onClick={props.onClick}>
            <span className="baseButton-text">{props.title}</span>
        </button>
    )
}

export default BaseButton
