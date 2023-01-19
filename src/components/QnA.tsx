import {makeAutoUrlComponent} from "@/common";
import {useEffect, useRef} from "react";

type QnAProps = {
    header: string,
    answer: string,
    comment: string,
    setComment: (comment: string) => void,
}



export const QnA = ({header, answer, comment, setComment}: QnAProps) => {
    const commentRef = useRef<HTMLTextAreaElement>(null);
    const isFilled = !!comment;
    
    useEffect(() => {
        if(isFilled && commentRef.current) {
            commentRef.current.value = comment;
        }
    }, [isFilled])
    
    return (
        <div className={"flex flex-col space-y-4"}>
            <div className={"flex flex-row space-x-4 items-center"}>
                <div className={"flex flex-col space-y-1 flex-1"}>
                    <p>
                        {header}
                    </p>
                    <p 
                        className={"rounded-md p-2 bg-[rgb(var(--card-rgb))]"}
                        dangerouslySetInnerHTML={{__html: makeAutoUrlComponent(answer)}}
                    />
                </div>
                <textarea
                    ref={commentRef}
                    placeholder={"코멘트를 적어주세요"}
                    className={"rounded-md p-2 bg-[rgb(var(--card-rgb))] flex-1"}
                    onChange={(e) => setComment(e.target.value)}
                >
                    {comment}
                </textarea>
            </div>
            <div 
                className={"w-full h-px bg-[rgb(var(--foreground-rgb))]"}
            />
        </div>
    )
}