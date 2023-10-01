type TimeLineItem = {
    date:string
    title: string;
    description: string;
    iconSrc: string;
    languageIcons: string[];
}

type TimelineProps  ={
    items: TimeLineItem[];
}

type TpCardProyect = {
    title: string,
    src: string, 
    description: string ,
    languages: string[]
}

export type {
    TimelineProps , 
    TimeLineItem,
    TpCardProyect
}


