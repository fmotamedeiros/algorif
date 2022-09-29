export const Description = (props) => {
    return(
    <div className="w-full flex-1 p-4 md:overflow-y-scroll">
        <div className="font-semibold leading-8 text-white">Tarefa</div>
        <div>{props.descricao}</div>

        <div className="font-semibold leading-8 text-white">Exemplo</div>
        <div>
            a = 3<br/>
            b = 5<br/>
            • O resultado da divisão inteira 3//5 = 0.<br/>
            • O resultado da divisão float é 3/5 = 0.6.<br/>
            Imprimir:
            <div className="border border-[#1F2937] p-2 bg-[#1F2937] mb-2">
                0<br/>
                0.6
            </div>
        </div>

        <div className="font-semibold leading-8 text-white">Formato de Entrada</div>
        <div>
            A primeira linha contém o primeiro inteiro, a.<br/>
            A segunda linha contém o segundo inteiro, b.
        </div>

        <div className="font-semibold leading-8 text-white">Formato de Saída</div>
        <div>
            Imprima as duas linhas conforme descrito acima.  
        </div>

        <div className="font-semibold leading-8 text-white">Entrada de Amostra 0</div>
            <div className="border border-[#1F2937] p-2 bg-[#1F2937] mb-2">
                4<br/>
                3
            </div>
                
        <div className="font-semibold leading-8 text-white">Entrada de Amostra 0</div>
            <div className="border border-[#1F2937] p-2 bg-[#1F2937] mb-2">
                1<br/>
                1.33333333333
            </div>
    </div>
    )
}

export default Description;