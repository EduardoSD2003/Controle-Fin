import { CircleArrowDown, CircleArrowUp, CircleDollarSign } from "lucide-react";
import "./App.css";
import { useEffect, useState } from "react";
import arrowDown from "./image/iconArrowDown.png";
import arrowUp from "./image/iconsArrowUp.png";
import trash from "./image/iconTrash.png";
import { Negociacoes } from "./Types/tipos";

const teste: Negociacoes[] = [];

function App() {
  const [entrada, setEntrada] = useState(false);
  const [valorEntrada, setValorEntrada] = useState<number>(0);

  const [saida, setSaida] = useState(false);
  const [valorSaida, setValorSaida] = useState<number>(0);

  const [valorTotal, setValorTotal] = useState<number>(0);

  const [lista, setLista] = useState(teste);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<number>(0);
  const [data, setData] = useState<string>("");

  const handleEntradaChange = () => {
    setEntrada(!entrada);
    setSaida(false);
  };

  const handleSaidaChange = () => {
    setSaida(!saida);
    setEntrada(false);
  };

  const deletar = (id: number, valor: number | undefined, e: boolean) => {
    if (id) {
      setLista(lista.filter((item) => item.id !== id));
    }

    if (valor != undefined) {
      if (e) {
        setValorEntrada(valorEntrada - valor);
      } else {
        setValorSaida(valorSaida - valor);
      }
      setValorTotal(valorTotal - valor);
    }

    debugger

  };

  const adicionar = (
    descricao: string,
    valor: number | undefined,
    data: string
  ) => {
    if (valor === undefined || valor === null) {
      console.error("Valor is required");
      return;
    }

    const novoItem = {
      id: generateID(),
      descricao: descricao,
      valor: valor,
      entrada: entrada,
      data: data,
    };

    if (entrada) {
      setValorEntrada((prevValue) => prevValue + valor);
    }

    if (saida) {
      setValorSaida((prevValue) => prevValue + valor);
    }

    setLista([...lista, novoItem]);
    resetar();

  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${(date.getDate() + 1).toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };
  useEffect(() => {
    setValorTotal(valorEntrada - valorSaida);
  }, [valorEntrada, valorSaida]);

  const resetar = () => {
    setDescricao("");
    setEntrada(false);
    setSaida(false);
    setValor(0);
    setData("");
  };


  const generateID = () => Math.round(Math.random() * 1000);



  return (
    <div className="flex flex-col items-center">
      <header className="bg-sky-700 flex justify-center h-64 w-full">
        <h1 className="text-3xl font-bold text-white pt-10">
          Controle financeiro
        </h1>
      </header>

      <div className="min-w-[700px] w-3/4 h-44 -mt-28 flex space-x-10 justify-between">
        <div className="min-w-[180px] bg-white h-full w-1/4 shadow-lg shadow-cyan-700/100 flex flex-col items-center space-y-10">
          <div className="flex justify-evenly pt-10 w-full items-center">
            <p className="text-2xl">Entrada</p>
            <CircleArrowUp />
          </div>
          <span className="text-3xl">R$ {valorEntrada.toFixed(2)}</span>
        </div>
        <div className="min-w-[180px] bg-white h-full w-1/4 shadow-lg shadow-cyan-700/100 flex flex-col items-center space-y-10">
          <div className="flex justify-evenly pt-10 w-full items-center">
            <p className="text-2xl">Saída</p>
            <CircleArrowDown />
          </div>
          <span className="text-3xl">R$ {valorSaida.toFixed(2)}</span>
        </div>
        <div className="min-w-[180px] bg-white h-full w-1/4 shadow-lg shadow-cyan-700/100 flex flex-col items-center space-y-10">
          <div className="flex justify-evenly pt-10 w-full items-center">
            <p className="text-2xl">Total</p>
            <CircleDollarSign />
          </div>
          <span className="text-3xl">R$ {valorTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="min-w-[900px] p-1 w-11/12 bg-slate-400 shadow-lg shadow-sky-600/40 h-24 mt-7 flex items-center justify-around rounded-md">
        <div className="flex flex-col">
          <label htmlFor="desc" className="text-xl">
            Data
          </label>
          <input
            type="date"
            id="desc"
            className="p-1 w-[90%]"
            value={data}
            onChange={(e) => {
              setData(e.target.value);
            }}
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="desc" className="text-xl">
            Descrição
          </label>
          <input
            type="text"
            id="desc"
            className="p-1 w-[90%] "
            value={descricao}
            onChange={(e) => {
              setDescricao(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="valor" className="text-xl">
            Valor
          </label>
          <input
            type="number"
            id="valor"
            className="p-1 w-[90%]"
            value={valor}
            required
            onChange={(e) => {
              setValor(Number(e.target.value));
            }}
          />
        </div>
        <div>
          <div className="flex space-x-10">
            <div className="flex space-x-2">
              <input
                type="radio"
                id="entrada"
                checked={entrada}
                onChange={handleEntradaChange}
              />
              <label htmlFor="entrada" className="text-xl">
                Entrada
              </label>
            </div>
            <div className="flex space-x-2">
              <input
                type="radio"
                id="saida"
                checked={saida}
                onChange={handleSaidaChange}
              />
              <label htmlFor="saida" className="text-xl">
                Saída
              </label>
            </div>
          </div>
        </div>
        <button
          className="p-5 bg-green-500 rounded-md"
          onClick={() => {
            if (descricao.length > 0 && valor > 0 && data) {
              adicionar(descricao, valor, data);
            }
          }}
        >
          Adicionar
        </button>
      </div>

      <div className="bg-slate-500 w-11/12 h-[28rem] mt-10 p-7 relative min-w-[900px]">


        <div className="flex w-full justify-between">
          <div className=" w-1/5">
            <p className="text-2xl">Data</p>
          </div>
          <div className=" w-2/6">
            <p className="text-2xl">Descrição</p>
          </div>
          <div className=" w-2/6">
            <p className="text-2xl">Valor</p>
          </div>
          <div className=" w-1/6">
            <p className="text-2xl">Tipo</p>
          </div>
        </div>

        <hr className="mt-3" />

        {lista.map((e, i) => {
          return (
            <div className="flex w-full justify-between mt-3" key={i}>
              <div className="w-1/5">
                <p className="text-xl text-slate-100">{formatDate(e.data)}</p>
              </div>
              <div className="w-2/6">
                <p className="text-xl text-slate-100">{e.descricao}</p>
              </div>
              <div className="w-2/6">
                <span className="text-xl flex text-slate-100 gap-1">
                  <p>R$: </p>
                  <p className="">
                    {e.entrada === true
                      ? e.valor?.toFixed(2)
                      : ` -${e.valor?.toFixed(2)}`}
                  </p>
                </span>
              </div>
              <div className="w-1/6">
                <div className="flex justify-between px-3">
                  {e.entrada === true ? (
                    <img src={arrowUp} alt="" className="size-7" />
                  ) : (
                    <img src={arrowDown} alt="" className="size-7" />
                  )}
                  <img
                    src={trash}
                    alt=""
                    className="size-7"
                    onClick={() => {
                      deletar(e.id, e.valor, e.entrada);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;