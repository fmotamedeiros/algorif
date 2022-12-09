export const Description = (props) => {
    return(
    <div className="w-full flex-1 p-4">
        <div className="font-semibold leading-8 text-white">Tarefa</div>
        <div>{props.descriptionData.tarefa}</div>

        <div className="font-semibold leading-8 text-white">Exemplo</div>
        <div>
            {props.descriptionData.exemplo}
            <div className="border border-[#1F2937] p-2 bg-[#1F2937] mb-2">
            {props.descriptionData.exemplo1}
            </div>
        </div>

        <div className="font-semibold leading-8 text-white">Formato de Entrada</div>
        <div>
            {props.descriptionData.entrada}
        </div>

        <div className="font-semibold leading-8 text-white">Formato de Saída</div>
        <div>
            {props.descriptionData.saida}
        </div>

        <div className="font-semibold leading-8 text-white">Entrada de Amostra 0</div>
            <div className="border border-[#1F2937] p-2 bg-[#1F2937] mb-2">
                {props.descriptionData.amostra0}
            </div>
                
        <div className="font-semibold leading-8 text-white">Entrada de Amostra 1</div>
            <div className="border border-[#1F2937] p-2 bg-[#1F2937] mb-2">
                {props.descriptionData.amostra1}
            </div>
    </div>
    )
}

export default Description;