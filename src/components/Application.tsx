import {CommentsKeyPrefix, copyToClipboard, Headers, HiddenHeaderIds} from "@/common";
import { QnA } from "./QnA";
import {useEffect, useState} from "react";

type ApplicationProps = {
    application: Array<string>,
}

export const Application = ({application}: ApplicationProps) => {
    const [comments, setComments] = useState<{ 
        key: string,
        data: Array<string> 
    }>({
        key: "",
        data: [...Array(application.length)],
    });
    
    useEffect(() => {
        if(application[0] === comments.key && comments.data.some((comment) => !!comment))
            localStorage.setItem(CommentsKeyPrefix + application[0], JSON.stringify(comments.data));
    }, [comments])
    
    useEffect(() => {
        const storedComments = localStorage.getItem(CommentsKeyPrefix + application[0]);
        if(storedComments) {
            setComments({
                key: application[0],
                data: JSON.parse(storedComments)
            });
        } else {
            setComments({
                key: application[0],
                data: [...Array(application.length)],
            });
        }
    }, [application])
    
    const changeComment = (index: number) => (comment: string) => {
        const newComments = [...comments.data];
        newComments[index] = comment;
        setComments(prev => ({
            ...prev,
            data: newComments,
        }));
    };
    
    const mergedComments = comments.data.reduce((acc, cur) => !!cur ? acc + cur + "\n" : acc, "");
    
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
                        comment={comments.data[idx]}
                        setComment={changeComment(idx)}
                        applicant={application[0]}
                        commentKey={comments.key}
                        isHidden={HiddenHeaderIds.includes(idx)}
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
                    <div
                        className={"relative"}
                    >
                        <p
                            className={"rounded-md p-2 bg-[rgb(var(--card-rgb))] whitespace-pre-line"}
                        >
                            {mergedComments}
                        </p>
                        <button
                            onClick={() => copyToClipboard(mergedComments)}
                            className={"absolute top-0 right-0 px-5 py-2 bg-indigo-500 hover:bg-indigo-700 text-white cursor-pointer rounded-md"}
                        >
                            copy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}