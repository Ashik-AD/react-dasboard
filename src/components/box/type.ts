import { ReactNode } from "react";

export interface BoxProps {
    children: ReactNode;
    display?: 'flex' | 'block' | 'inline-block';
    justify?: 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'center' | 'flex-end';
    align?: 'flex-start' | 'center' | 'flex-end';
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    space?: number;
    className?: string;
    margin?: number;
    mx?: number;
    my?: number;
    mt?: number;
    mr?: number;
    mb?: number;
    ml?: number;
    padding?: number;
    py?: number;
    px?: number;
    pt?: number;
    pr?: number;
    pb?: number;
    pl?: number;
}