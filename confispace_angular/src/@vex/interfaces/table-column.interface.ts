export interface TableColumn<T> {
  label: string;
  property: keyof T | string;
  type: 'text' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button' | 'date' | 'boolean';
  visible?: boolean;
  cssClasses?: string[];
  pipe?: any
}
