import { ReactNode } from 'react'
import theme from '../../public/theme.png'
type Props = {
    children: ReactNode
    modal: ReactNode
}

export default function Layout({
    children,
    modal, // will be a page or nested layout
}: Props) {
    return (
        <section className=" flex h-dvh w-dvw flex-col ">
            <div className="flex flex-grow  flex-row bg-[url(../../public/theme.png)] ">{children}</div>

            <footer className="flex h-6 w-full flex-row items-center justify-center bg-gray-100">
                <span className="text-gray-600 ">© 2021 FiveIdiots</span>
            </footer>
            {modal}
        </section>
    )
}
