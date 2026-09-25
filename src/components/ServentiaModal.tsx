import React, { useState } from 'react';
import { Building2, X, Check, Save } from 'lucide-react';
import { ServentiaPadrao } from '../types';

interface ServentiaModalProps {
  isOpen: boolean;
  onClose: () => void;
  serventiaAtual: ServentiaPadrao | null;
  onSalvar: (dados: ServentiaPadrao) => void;
}

export const ServentiaModal: React.FC<ServentiaModalProps> = ({
  isOpen,
  onClose,
  serventiaAtual,
  onSalvar,
}) => {
  const [serventia, setServentia] = useState(serventiaAtual?.serventia || '');
  const [municipioComarca, setMunicipioComarca] = useState(serventiaAtual?.municipioComarca || '');
  const [oficialPrepostoPadrao, setOficialPrepostoPadrao] = useState(serventiaAtual?.oficialPrepostoPadrao || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSalvar({
      serventia: serventia.trim(),
      municipioComarca: municipioComarca.trim(),
      oficialPrepostoPadrao: oficialPrepostoPadrao.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        <div className="bg-[#004a80] px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5" />
            <h3 className="font-bold text-sm tracking-wide uppercase">
              Configurar Serventia Padrão (Cartório)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Defina os dados da sua Serventia / Cartório para que sejam preenchidos automaticamente em todas as novas declarações de hipossuficiência.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nome da Serventia / Cartório:
            </label>
            <input
              type="text"
              placeholder="Ex: 1º Ofício de Notas e RCPN de Natal"
              value={serventia}
              onChange={(e) => setServentia(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Município / Comarca:
            </label>
            <input
              type="text"
              placeholder="Ex: Natal/RN"
              value={municipioComarca}
              onChange={(e) => setMunicipioComarca(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nome do Oficial ou Preposto (opcional para Seção 9):
            </label>
            <input
              type="text"
              placeholder="Ex: Maria Souza - Escrevente Autorizada"
              value={oficialPrepostoPadrao}
              onChange={(e) => setOficialPrepostoPadrao(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#004a80] hover:bg-[#003660] rounded-lg shadow-sm transition"
            >
              <Save className="w-3.5 h-3.5" />
              Salvar como Padrão
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
