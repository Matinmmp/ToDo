function alertGenerator(input,title,text) {
    const section = document.createElement('section');
    section.innerHTML = `<div id="alert" class="alert alert-${input}  shadow-lg w-[15rem] flex flex-col ">
    <div class="flex justify-between w-full">
        <span >${title}</span>
        <span id="close" class="cursor-pointer"" >X</span>
    </div>
    <div class="flex justify-between w-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="me-auto">${text}</span>
    </div>
    </div>`;
    section.querySelector('#close').addEventListener('click', () => section.remove());
    document.body.append(section);
    setTimeout(() => section.remove(), 5000);
}