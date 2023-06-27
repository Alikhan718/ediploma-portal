export const handleLink = (href: string) => {
    const link = document.createElement('a');
    link.target = "_blank";
    link.href = href;
    link.click();
};