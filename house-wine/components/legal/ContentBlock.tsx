interface ContentBlockProps {
    heading?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined
    title: string
    desc?: string | React.ReactNode
    children?: React.ReactNode
    listTitle?: string
    list?: boolean
    listBlockStyle?: boolean
}

export function ContentBlock({ heading: H = "h2", title, desc, listTitle, children, list, listBlockStyle }: ContentBlockProps) {
    return (
        <section>
            <H>{title}</H>
            <p>{desc}</p>
            {list && (
                <div className={`${listBlockStyle && "p-4 my-2 bg-neutral-200 border-2 border-neutral-400 rounded-xl"}`}>
                    {listTitle && (
                        <h4 className="font-semibold font-ibm-plex-sans!">{listTitle}</h4>
                    )}
                    {children}
                </div>
            )}
        </section>
    )
}