export interface GiaoDien {
    header?: HeaderNhaHang;
    home?: HomeNhaHang;
    about?: AboutNhaHang;
    footer?: FooterNhaHang;
}

export interface HeaderNhaHang {
    logo?: string;
    backgroundColor?: string;
    imageSlider?: string[];
}

export interface HomeNhaHang {
    title?: string;
    content?: string;
    image?: string;
    content1?: Content1[];
    content2?: Content2[];
}

export interface Content1 {
    title?: string;
    content?: string;
    image?: string;
}

export interface Content2 {
    title?: string;
    content?: string;
    image?: string;
}

export interface AboutNhaHang {
    content?: ContentAbout[];
}

export interface ContentAbout {
    title?: string;
    content?: string;
    image?: string;
}

export interface FooterNhaHang {
    title?: string;
    content?: string;
    logo?: string;
    backgroundColor?: string;
    address?: string[];
    phone?: string[];
    email?: string[];
    social?: string[];
}