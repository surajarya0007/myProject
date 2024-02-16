import Image from "next/image";

type ButtonProps = {
    type: 'button' | 'submit';
    title: string;
    icon?: string;
    variant: string;
}

function Button({type, title, icon, variant}:ButtonProps ) {
  return (
    <button type={type} className={` gap-3 items-center justify-center rounded-full border ${variant}`} >
        { icon && <Image src={icon} alt={title} width={25} height={15} />}
        {title}
    </button>
  )
}

export default Button