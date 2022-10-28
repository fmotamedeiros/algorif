export const Description = (props) => {
    return(
    <div className="w-full flex-1 p-4">
        <div className="font-semibold leading-8 text-white">Tarefa</div>
        <div>{props.descricao}</div>

        <div className="font-semibold leading-8 text-white">Exemplo</div>
        <div>
            {props.exemplo}
            <div className="border border-[#1F2937] p-2 bg-[#1F2937] mb-2">
            {props.exemplo1}
            </div>
        </div>

        <div className="font-semibold leading-8 text-white">Formato de Entrada</div>
        <div>
            {props.entrada}
        </div>

        <div className="font-semibold leading-8 text-white">Formato de Saída</div>
        <div>
            {props.saida}
        </div>

        <div className="font-semibold leading-8 text-white">Entrada de Amostra 0</div>
            <div className="border border-[#1F2937] p-2 bg-[#1F2937] mb-2">
                {props.amostra0}
            </div>
                
        <div className="font-semibold leading-8 text-white">Entrada de Amostra 1</div>
            <div className="border border-[#1F2937] p-2 bg-[#1F2937] mb-2">
                {props.amostra1}
            </div>
    </div>
    )
}

export default Description;