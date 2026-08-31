export function triggerDownload(downloadUrl: string, downloadFileName: string): void
{
    const hidden_a = document.createElement("a");
    hidden_a.style.display = "none";
    hidden_a.setAttribute("href", downloadUrl);
    hidden_a.setAttribute("target", "_self");
    hidden_a.setAttribute("download", downloadFileName);

    document.body.appendChild(hidden_a);
    hidden_a.click();
    document.body.removeChild(hidden_a);
}
