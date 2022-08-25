import { PrimaryColor } from "../../../theme/colors";

type Varient = 'text' | 'contained' |  'outlined';
type Color = 'success' | 'info' | 'warning' | 'error';
type Size = 'small' | 'medium' | 'large'; 

export interface ButtonType {
  readonly  varient?: Varient; 
   readonly children: string;
   readonly color?: Color;
   readonly size?: Size;
   readonly theme?: {
    primaryColor: PrimaryColor;
   }
}   