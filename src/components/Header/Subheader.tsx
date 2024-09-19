import { ReactNode } from "react"

type Props = {
    label: string | ReactNode
    action?: ReactNode
}

const Subheader = ({label, action}: Props) => {
    return <div className="h-10 bg-primary flex items-center justify-between text-white text-sm px-4 fixed top-[44px] max-w-[768px] w-full  z-[1500]">
    <p>{label}</p>
  </div>
}

export default Subheader