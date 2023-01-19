import {Headers} from "@/common";
import { QnA } from "./QnA";
import {useEffect, useState} from "react";

type ApplicationProps = {
    application: Array<string>,
}

const CommentsKeyPrefix = "geultto_8th_comments_";

export const Application = ({application}: ApplicationProps) => {
    const [comments, setComments] = useState<Array<string>>([...Array(application.length)]);
    
    useEffect(() => {
        if(comments.some((comment) => !!comment))
            localStorage.setItem(CommentsKeyPrefix + application[0], JSON.stringify(comments));
    }, [comments])
    
    useEffect(() => {
        const storedComments = localStorage.getItem(CommentsKeyPrefix + application[0]);
        if(storedComments) {
            setComments(JSON.parse(storedComments));
        }
    }, [application])
    
    const changeComment = (index: number) => (comment: string) => {
        const newComments = [...comments];
        newComments[index] = comment;
        setComments(newComments);
    };
    
    return (
        <div
            className={"flex flex-col space-y-4 py-10"}
        >
            {
                Headers.map((header, idx) => (
                    <QnA 
                        key={idx}
                        header={header}
                        answer={application[idx]}
                        comment={comments[idx]}
                        setComment={changeComment(idx)}
                    />
                ))
            }
            <div
                className={"flex flex-col space-y-4"}
            >
                <div className={"flex flex-col space-y-1 flex-1"}>
                    <p>
                        코멘트 총합
                    </p>
                    <p
                        className={"rounded-md p-2 bg-[rgb(var(--card-rgb))] whitespace-pre-line"}
                    >
                        {comments.reduce((acc, cur) => !!cur ? acc + cur + "\n" : acc, "")}
                    </p>
                </div>
            </div>
        </div>
    )
}