import React from 'react';
import { History, X, Trash2, Eye, Calendar, User, FileText } from 'lucide-react';
import { FormularioHipossuficiencia } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  historico: FormularioHipossuficiencia[];
  onSelecionar: (item: FormularioHipossuficiencia) => void;
  onExcluir: (id: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  historico,
  onSelecionar,
  onExcluir,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200">
        <div className="bg-[#004a80] px-5 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <History className="w-5 h-5" />
            <h3 className="font-bold text-sm tracking-wide uppercase">
              Histórico de Declarações Geradas ({historico.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-2.5">
          {historico.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold text-slate-600">Nenhuma declaração no histórico ainda</p>
              <p className="text-xs text-slate-400 mt-1">
                Ao clicar em "Conferir e Gerar Declaração", uma cópia será guardada aqui para consulta rápida.
              </p>
            </div>
          ) : (
            historico.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 border border-slate-200 rounded-lg hover:border-blue-400 hover:bg-blue-50/40 transition group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-blue-800" />
                    <span className="font-bold text-xs text-slate-800">
                      {item.beneficiarioNome || 'Sem nome especificado'}
                    </span>
                    {item.beneficiarioDocumento && (
                      <span className="text-[11px] text-slate-500 font-mono">
                        ({item.beneficiarioDocumento})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.criadoEm
                        ? new Date(item.criadoEm).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'Data não informada'}
                    </span>
                    {item.serventia && (
                      <span className="truncate max-w-[200px]">· {item.serventia}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelecionar(item);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-800 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-md transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Carregar
                  </button>
                  <button
                    onClick={() => item.id && onExcluir(item.id)}
                    className="text-slate-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition"
                    title="Excluir do histórico"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
