import React from 'react';
import { Calendar, Mail, Phone, MessageSquare } from 'lucide-react';
import type { Company, Communication } from '../../types/company';

interface CompanyGridProps {
  companies: Company[];
  communications: Communication[];
}

const CompanyGrid: React.FC<CompanyGridProps> = ({ companies, communications }) => {
  const getStatusColor = (company: Company) => {
    const lastComm = communications
      .filter(c => c.companyId === company.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    if (!lastComm) return 'bg-red-50 border-red-200';
    
    const daysSinceLastComm = Math.floor(
      (new Date().getTime() - new Date(lastComm.date).getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastComm > company.communicationPeriodicity) return 'bg-red-50 border-red-200';
    if (daysSinceLastComm === company.communicationPeriodicity) return 'bg-yellow-50 border-yellow-200';
    return 'bg-white border-gray-200';
  };

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4 text-blue-500" />;
      case 'phone': return <Phone className="h-4 w-4 text-green-500" />;
      case 'linkedin': return <MessageSquare className="h-4 w-4 text-purple-500" />;
      default: return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last 5 Communications
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Next Scheduled
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {companies.map((company) => {
            const companyComms = communications
              .filter(c => c.companyId === company.id)
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 5);

            return (
              <tr key={company.id} className={`${getStatusColor(company)} transition-colors duration-200`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{company.name}</div>
                  <div className="text-sm text-gray-500">{company.location}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {companyComms.map((comm, idx) => (
                      <div
                        key={idx}
                        className="group relative"
                      >
                        {getMethodIcon(comm.methodId)}
                        <div className="hidden group-hover:block absolute z-10 w-48 p-2 mt-2 bg-white rounded-lg shadow-lg border border-gray-100">
                          <p className="text-sm text-gray-600">{comm.notes}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(comm.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {/* Next scheduled communication logic */}
                  {new Date(
                    new Date(companyComms[0]?.date || new Date()).getTime() + 
                    (company.communicationPeriodicity * 24 * 60 * 60 * 1000)
                  ).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${companyComms[0]?.status === 'completed' ? 'bg-green-100 text-green-800' :
                      companyComms[0]?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                    {companyComms[0]?.status || 'overdue'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyGrid;