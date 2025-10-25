import { Search, MapPin, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {  useMemo, useState } from 'react';
import { states } from '@/mockdata/state';
import { useDebounce } from '@/hooks/debounce';



export function StateSelection() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock districts for demonstration
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const filteredStates = useMemo(()=>{
    return states.filter(({ en }) =>
      en.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm])

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Header with Icon */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4">
          <MapPin className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl mb-2">मनरेगा / MGNREGA</h1>
        <p className="text-xl text-muted-foreground">अपना राज्य चुनें / Select Your State</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
        <Input
          type="text"
          placeholder="जिला खोजें / Search state..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-14 h-16 border-2"
          name='state-search'
        />
      </div>

      {/* State Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStates.map((state) => (
          <Card
            key={state.en}
            className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-green-500"
           
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl">{state.en}</h3>
                  <p className="text-sm text-muted-foreground">{state.hi} / {state.en}</p>
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
              अपने राज्य का चयन करें और मनरेगा कार्यक्रम का प्रदर्शन देखें
              <br />
              Select your state to view MGNREGA program performance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
