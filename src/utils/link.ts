export const handleLink = (href: string): void => {
    const link = document.createElement('a');
    link.target = "_blank";
    link.href = href;
    link.click();
};
export const handleDownload = (href: string, fileName: string): void => {
    const xhr = new XMLHttpRequest();
    
    xhr.responseType = 'blob';

    xhr.onload = () => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(xhr.response);
        link.download = fileName;
        link.click();
    };

    xhr.open('GET', href);
    xhr.send();
};