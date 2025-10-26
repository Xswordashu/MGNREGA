import { Search,  ChevronRight, Map } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {  useMemo, useState } from 'react';
import { useDebounce } from '@/hooks/debounce';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { districts } from '@/mockdata/district';



export default function DistrictSelection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 
  const stateName = searchParams.get("state_name") ?? "";
  const [searchTerm, setSearchTerm] = useState('');
  const stateDistricts = districts[stateName as keyof typeof districts] || [];
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const filteredDistricts = useMemo(()=>{
    return stateDistricts.filter((district) =>
      district.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm])

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Header with Icon */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 rounded-full mb-4">
          <Map className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl mb-2">मनरेगा / MGNREGA</h1>
        <p className="text-xl text-muted-foreground">अपना जिला चुनें / Select Your District</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
        <Input
          type="text"
          placeholder="जिला खोजें / Search district..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-14 h-16 border-2"
          name='state-search'
        />
      </div>

      {/* State Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDistricts.map((district) => (
          <Card
            key={district}
            className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-purple-500"
            onClick={()=> navigate(`/view?state_name=${stateName}&district_name=${district}`)
            }
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Map className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl">{district}</h3>
                  <p className="text-sm text-muted-foreground"> {stateName}</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>

      {/* Info Footer */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">ℹ️</span>
          </div>
          <div>
            <h4 className="mb-1">जानकारी / Information</h4>
            <p className="text-sm text-muted-foreground">
              अपने जिले का चयन करें और मनरेगा कार्यक्रम का प्रदर्शन देखें
              <br />
              Select your district to view MGNREGA program performance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
