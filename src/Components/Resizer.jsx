export default function Resizer(){
    return(
        <div className="pl-8">
            <form method="post">
                <input className="m-1 outline-none text-white border border-2 bg-inherit border-cyan-300 rounded-2xl w-full px-3 py-1" type="text" name="fileName" id="name" placeholder="File name" /><br/>
                <input className="m-1 outline-none text-white border border-2 bg-inherit border-cyan-300 rounded-2xl w-32 px-3 py-1" type="text" name="fileName" id="name" placeholder="width" />
                <select name="unit" id="wid_u" className="outline-none border border-2 bg-inherit border-cyan-300 rounded-2xl text-white px-1 py-1">
                    <option className="text-white bg-black" value="px">px</option>
                    <option className="text-white bg-black" value="cm">cm</option>
                    <option className="text-white bg-black" value="in">in</option>
                </select>
                <input className="m-1 outline-none text-white border border-2 bg-inherit border-cyan-300 rounded-2xl w-32 px-3 py-1" type="text" name="fileName" id="name" placeholder="height" />
                <select name="unit" id="wid_u" className="outline-none border border-2 bg-inherit border-cyan-300 rounded-2xl text-white px-1 py-1">
                    <option className="text-white bg-black" value="px">px</option>
                    <option className="text-white bg-black" value="cm">cm</option>
                    <option className="text-white bg-black" value="in">in</option>
                </select> <br />
            </form>
        </div>
    )
}