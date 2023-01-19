import {ChangeEvent, MouseEventHandler, useCallback, useEffect, useState} from "react";
import {Headers, TextClass} from "@/common";
import {Application} from "@/components/Application";
import {DisplayThemeType, ThemeButton} from "@/components/ThemeButton";

const RawApplicationKey = "geultto_8th_applications";
const ApplicationIdKey = "geultto_8th_application_id";

export default function Home() {
    const [open, setOpen] = useState(false);
    const [applicationsOpen, setApplicationsOpen] = useState(false);
    const [applicationId, setApplicationId] = useState(0);
    
    const [rawApplication, setRawApplication] = useState("");
    const [applications, setApplications] = useState<Array<Array<string>>>(Array());
    const [textClassId, setTextClassId] = useState(4);
    
    const handleChange = (e: ChangeEvent) => {
        const { target } = e;
        setRawApplication((target as HTMLInputElement).value);
    }

    const [displayTheme, setDisplayTheme] = useState<DisplayThemeType>(DisplayThemeType.Light);

    useEffect(() => {
        if(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches
            || localStorage.theme === DisplayThemeType.Dark) {
            document.documentElement.classList.add(DisplayThemeType.Dark);
            setDisplayTheme(DisplayThemeType.Dark);
        } else {
            document.documentElement.classList.remove(DisplayThemeType.Dark);
            setDisplayTheme(DisplayThemeType.Light);
        }
    }, [])

    const handleThemeChange = (newDisplayTheme: DisplayThemeType) => {
        setDisplayTheme(newDisplayTheme);
        localStorage.theme = newDisplayTheme;
        if(newDisplayTheme === DisplayThemeType.Dark) {
            document.documentElement.classList.add(DisplayThemeType.Dark);
        } else {
            document.documentElement.classList.remove(DisplayThemeType.Dark);
        }
    }

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        handleThemeChange(
            displayTheme === DisplayThemeType.Dark ? DisplayThemeType.Light : DisplayThemeType.Dark
        );
    }, [displayTheme]);

    useEffect(() => {
        setRawApplication(localStorage.getItem(RawApplicationKey) || "");
    }, [])

    useEffect(() => {
        if(!applications.length) return () => {};
        
        const storedApplicationId = Number(localStorage.getItem(ApplicationIdKey) || "0");
        if(storedApplicationId && (applications.length > storedApplicationId)) {
            setApplicationId(storedApplicationId);
        }
    }, [applications])
    
    useEffect(() => {
        if(applicationId) localStorage.setItem(ApplicationIdKey, applicationId.toString());
    }, [applicationId])
    
    useEffect(() => {
        if(!rawApplication) return () => {};

        localStorage.setItem(RawApplicationKey, rawApplication);
        
        const splitByTab = rawApplication.split("\t");
        setApplications(splitByTab.reduce((acc, cur, idx) => {
            if(!idx) {
                return [[cur,],];
            }
            
            if((idx - 1) % (Headers.length - 1) === (Headers.length - 2)) {
                const splitedCur = cur.split(" ");
                const name = splitedCur[splitedCur.length - 1];
                acc[acc.length - 1].push(cur.slice(0, cur.lastIndexOf(" ")));
                acc.push([name, ]);
                
                return [...acc];
            }
            
            acc[acc.length - 1].push(cur);
            return [...acc];
        }, Array()).slice(0, -1));
    }, [rawApplication])
    
    return (
    <div className={displayTheme} id={"app"}>
      <header className={"fixed inset-x-0 top-0 h-16 bg-[rgb(var(--tile-start-rgb))]"}>
        <div className={"container mx-auto flex flex-row items-center h-full justify-between"}>
            <div className={"flex flex-row space-x-4"}>
                <button
                    id="open"
                    className="px-2 py-1 bg-rose-500 hover:bg-rose-700 text-white cursor-pointer rounded-md"
                    onClick={() => setOpen(true)}
                >
                    스프레드시트 붙여넣기
                </button>
                <button
                    className="px-2 py-1 bg-rose-500 hover:bg-rose-700 text-white cursor-pointer rounded-md disabled:opacity-50"
                    onClick={() => setTextClassId(prev => prev + 1)}
                    disabled={textClassId === TextClass.length - 1}
                >
                    +
                </button>
                <button
                    className="px-2 py-1 bg-rose-500 hover:bg-rose-700 text-white cursor-pointer rounded-md disabled:opacity-50"
                    onClick={() => setTextClassId(prev => prev - 1)}
                    disabled={textClassId === 0}
                >
                    -
                </button>
            </div>
            <div className={"flex flex-row space-x-4"}>
                {
                    applications.length ? (
                        <button
                            className="px-2 py-1 bg-rose-500 hover:bg-rose-700 text-white cursor-pointer rounded-md disabled:opacity-50"
                            onClick={() => setApplicationsOpen(true)}
                        >
                            {applications[applicationId][0]}
                            <div className="ml-2 w-4 overflow-hidden inline-block">
                                <div className="h-2 w-2 bg-[rgb(var(--foreground-rgb))] -rotate-45 transform origin-top-left"></div>
                            </div>
                        </button>
                    ) : null
                }
                <button
                    onClick={handleClick}
                >
                    <ThemeButton
                        displayTheme={displayTheme}
                    />
                </button>
            </div>
        </div>
      </header>
      <main className={`${TextClass[textClassId]} min-h-screen`}>
          <div 
            className={"h-16"}
          />
          <div 
              id="overlay" 
              className={`fixed ${open ? "" : "hidden"} z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60`}
          >
          </div>
          <div id="dialog"
               className={`${open ? "" : "hidden"} fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-[rgb(var(--card-rgb))] rounded-md px-8 py-6 space-y-5 drop-shadow-lg`}>
              <h1 className="text-2xl font-semibold">엑셀에서 지원서를 복사에서 여기에 붙여넣어주세요.</h1>
              <input
                  className={"w-full"}
                  autoFocus={open}
                  onChange={handleChange}
              />
              <div className="flex justify-end">
                  <button 
                    id="close" 
                    className="px-5 py-2 bg-indigo-500 hover:bg-indigo-700 text-white cursor-pointer rounded-md"
                    onClick={() => setOpen(false)}
                  >
                      Close
                  </button>
              </div>
          </div>
          {
              applications.length ? (
                  <div id="applicationsDialog"
                       className={`${applicationsOpen ? "" : "hidden"} fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-[rgb(var(--card-rgb))] rounded-md px-8 py-6 space-y-5 drop-shadow-lg`}>
                      <h1 className="text-2xl font-semibold">보실 지원서를 선택해주세요</h1>
                      <div
                        className={"flex flex-col space-y-2"}
                      >
                          {
                            applications.map((application, idx) => (
                                <button
                                    key={idx}
                                    className={`
                                    px-2 py-1 bg-rose-500 hover:bg-rose-700 text-white cursor-pointer rounded-md
                                    ${applicationId === idx ? "bg-rose-700" : ""}
                                    `}
                                    onClick={() => {
                                        setApplicationId(idx);
                                    }}
                                >
                                    {application[0]}
                                </button>
                            ))
                          }
                      </div>
                      <div className="flex justify-end">
                          <button
                              id="close"
                              className="px-5 py-2 bg-indigo-500 hover:bg-indigo-700 text-white cursor-pointer rounded-md"
                              onClick={() => setApplicationsOpen(false)}
                          >
                              Close
                          </button>
                      </div>
                  </div>
              ) : null
          }
          <div className="container mx-auto h-full">
          {
              applications.length ? (
                  <Application application={applications[applicationId]} />
              ) : (
                  <div className={"w-full h-full flex flex-col justify-center"}>
                      <p className={"text-4xl text-center"}>
                          좌측 상단에 있는 버튼을 눌러 <br/> 지원서를 붙여넣어주세요.
                      </p>
                  </div>
              )
          }
          </div>
      </main>
    </div>
    )
}
