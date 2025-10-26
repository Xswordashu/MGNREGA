import { 
  ArrowLeft, Users, Briefcase, Calendar, IndianRupee, TrendingUp, TrendingDown, 
  CheckCircle, Clock, FileText, MapPin, Building2, AlertCircle,
  Wallet, Hammer, PieChart as PieChartIcon, Target, UserCheck, CreditCard,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { MgnregaDetails } from '@/redux/services/product';
import { 
//   BarChart, 
//   Bar, 
//   LineChart, 
//   Line, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DetailViewProps {
  record: MgnregaDetails;
  
  onBack: () => void;
}

export default function DetailView({ record, onBack }: DetailViewProps) {
  // Mock data for charts
//   const expenditureTrendData = [
//     { month: 'Jul', exp: 1420 },
//     { month: 'Aug', exp: 1480 },
//     { month: 'Sep', exp: 1450 },
//     { month: 'Oct', exp: 1450 },
//     { month: 'Nov', exp: 1580 },
//     { month: 'Dec', exp: 1739 },
//   ];

  const expenditureCompositionData = [
    { name: 'Wages', value: Number(record.Wages), color: '#22c55e' },
    { name: 'Material & Skilled', value: Number(record.Material_and_skilled_Wages), color: '#3b82f6' },
    { name: 'Admin', value: Number(record.Total_Adm_Expenditure), color: '#f59e0b' },
  ];

  const sectorDistributionData = [
    { name: 'Agriculture & Allied', value: Number(record.percent_of_Expenditure_on_Agriculture_Allied_Works), color: '#10b981' },
    { name: 'NRM', value: Number(record.percent_of_NRM_Expenditure), color: '#3b82f6' },
    { name: 'Category B', value: Number(record.percent_of_Category_B_Works), color: '#f59e0b' },
  ];

//   const demographicsData = [
//     { category: 'Women', value: Number(record.Women_Persondays), color: '#ec4899' },
//     { category: 'SC', value: Number(record.SC_persondays), color: '#8b5cf6' },
//     { category: 'ST', value: Number(record.ST_persondays), color: '#3b82f6' },
//   ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 h-12 px-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>सूची पर वापस / Back to List</span>
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl">{record.month} {record.fin_year} </h1>
              <p className="text-muted-foreground">{record.district_name} - पूर्ण विवरण / Full Details</p>
            </div>
          </div>
        </div>

        {/* Performance Score */}
        {/* <Card className="p-6 mb-6 bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">समग्र प्रदर्शन / Overall Performance</p>
              <div className="flex items-center gap-3">
                <h2 className="text-5xl">अच्छा / Good</h2>
                <TrendingUp className="w-10 h-10" />
              </div>
            </div>
            <div className="text-right">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-4xl">✓</span>
              </div>
            </div>
          </div>
        </Card> */}

        {/* Tabs for Different Views */}
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="overview" className="py-3">
              <span className="text-sm">📊 अवलोकन / Overview</span>
            </TabsTrigger>
            <TabsTrigger value="financials" className="py-3">
              <span className="text-sm">💰 वित्त / Financials</span>
            </TabsTrigger>
            <TabsTrigger value="demographics" className="py-3">
              <span className="text-sm">👷‍♀️ जनसांख्यिकी / Demographics</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Overview */}
          <TabsContent value="overview" className="space-y-6">
            {/* Basic Information Section */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl">📘 मूल जानकारी / Basic Information</h3>
                  <p className="text-sm text-muted-foreground">जिला विवरण / District Details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-muted-foreground">जिला / District</span>
                  </div>
                  <p className="text-xl">{record.district_name}</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-muted-foreground">राज्य / State</span>
                  </div>
                  <p className="text-xl">{record.state_name}</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-muted-foreground">वित्तीय वर्ष / Financial Year</span>
                  </div>
                  <p className="text-xl">{record.fin_year}</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-muted-foreground">महीना / Month</span>
                  </div>
                  <p className="text-xl">{record.month}</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-muted-foreground">श्रम बजट / Labour Budget</span>
                  </div>
                  <p className="text-xl">{record.Approved_Labour_Budget}</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-muted-foreground">कुल कार्य / Total Works</span>
                  </div>
                  <p className="text-xl">{record.Total_No_of_Works_Takenup}</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-muted-foreground">पूर्ण कार्य / Completed</span>
                  </div>
                  <p className="text-xl">{record.Number_of_Completed_Works}</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <span className="text-sm text-muted-foreground">चालू कार्य / Ongoing</span>
                  </div>
                  <p className="text-xl">{record.Number_of_Ongoing_Works}</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-muted-foreground">शून्य व्यय GP / NIL Exp GPs</span>
                  </div>
                  <p className="text-xl">{record.Number_of_GPs_with_NIL_exp}</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-muted-foreground">टिप्पणी / Remarks</span>
                  </div>
                  <p className="text-xl">{record.Remarks}</p>
                </div>
              </div>
            </Card>

            {/* Key Highlights Section */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl">📈 मुख्य विशेषताएं / Key Highlights</h3>
                  <p className="text-sm text-muted-foreground">प्रमुख संकेतक / Key Indicators</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Average Wage Rate */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg border-2 border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <IndianRupee className="w-8 h-8 text-purple-600" />
                    <Badge className="bg-purple-600">
                      <TrendingUp className="w-4 h-4" />
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">औसत मजदूरी दर</p>
                  <p className="text-xs text-muted-foreground mb-2">Average Wage Rate</p>
                  <h3 className="text-3xl mb-2">{Number(record.Average_Wage_rate_per_day_per_person).toFixed(2)}</h3>
                  <p className="text-xs text-muted-foreground">प्रति दिन / Per day</p>
                  {/* <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>पिछले वर्ष से +5% / +5% vs last year</span>
                  </div> */}
                </div>

                {/* Average Days of Employment */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-lg border-2 border-orange-200">
                  <div className="flex items-center justify-between mb-3">
                    <Calendar className="w-8 h-8 text-orange-600" />
                    <Badge className="bg-orange-600">
                      <TrendingUp className="w-4 h-4" />
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">औसत रोजगार दिवस</p>
                  <p className="text-xs text-muted-foreground mb-2">Avg Employment Days</p>
                  <h3 className="text-3xl mb-2">{record.Average_days_of_employment_provided_per_Household} दिन</h3>
                  <Progress value={Number(record.Average_days_of_employment_provided_per_Household)} max={100} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">लक्ष्य: 100 दिन / Target: 100 days</p>
                  {/* <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>पिछले वर्ष से +3% / +3% vs last year</span>
                  </div> */}
                </div>

                {/* Timely Payment Percentage */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border-2 border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <Clock className="w-8 h-8 text-green-600" />
                    <Badge className="bg-green-600">उत्कृष्ट</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">समय पर भुगतान</p>
                  <p className="text-xs text-muted-foreground mb-2">Timely Payments (15 days)</p>
                  <h3 className="text-3xl mb-2">{record.percentage_payments_gererated_within_15_days}</h3>
                  <Progress value={99.98} className="h-2 mb-2" />
                  {/* <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>पिछले वर्ष: 99.1% / Last year: 99.1%</span>
                  </div> */}
                </div>
              </div>
            </Card>

            {/* Mini Chart - Total Expenditure Trend */}
            {/* <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl">💡 व्यय रुझान / Expenditure Trend</h3>
                  <p className="text-sm text-muted-foreground">पिछले 6 महीने / Last 6 Months</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={expenditureTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="exp" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    name="Expenditure (₹ Lakh)"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-2 justify-center mt-3">
                <div className="w-4 h-4 bg-amber-600 rounded-full"></div>
                <span className="text-sm">कुल व्यय (₹ लाख) / Total Expenditure (₹ Lakh)</span>
              </div>
            </Card> */}
          </TabsContent>

          {/* TAB 2: Financials */}
          <TabsContent value="financials" className="space-y-6">
            {/* Budget & Expenditure Section */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl">💵 बजट और व्यय / Budget & Expenditure</h3>
                  <p className="text-sm text-muted-foreground">वित्तीय सारांश / Financial Summary</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Approved Labour Budget */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <Target className="w-8 h-8 text-blue-600" />
                    <Badge className="bg-blue-600">बजट</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">स्वीकृत श्रम बजट</p>
                  <p className="text-xs text-muted-foreground mb-2">Approved Labour Budget</p>
                  <h3 className="text-3xl">{record.Approved_Labour_Budget}</h3>
                  {/* <p className="text-xs text-muted-foreground mt-1">व्यक्ति-दिवस / Person-days</p> */}
                </div>

                {/* Total Expenditure */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border-2 border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <IndianRupee className="w-8 h-8 text-green-600" />
                    <Badge className="bg-green-600">
                      <TrendingUp className="w-4 h-4" />
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">कुल व्यय</p>
                  <p className="text-xs text-muted-foreground mb-2">Total Expenditure</p>
                  <h3 className="text-3xl">{Number(record.Total_Exp).toFixed(2)}</h3>
                  {/* <p className="text-xs text-muted-foreground mt-1">लाख / Lakh</p> */}
                  {/* <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>+10% from last month</span>
                  </div> */}
                </div>

                {/* Wages */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg border-2 border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <Users className="w-8 h-8 text-purple-600" />
                    <Badge className="bg-purple-600">
                      <TrendingUp className="w-4 h-4" />
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">मजदूरी</p>
                  <p className="text-xs text-muted-foreground mb-2">Wages</p>
                  <h3 className="text-3xl">{Number(record.Wages).toFixed(2)}</h3>
                  {/* <p className="text-xs text-muted-foreground mt-1">लाख / Lakh</p> */}
                  {/* <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>+8% from last month</span>
                  </div> */}
                </div>

                {/* Material & Skilled Wages */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-lg border-2 border-amber-200">
                  <div className="flex items-center justify-between mb-3">
                    <Hammer className="w-8 h-8 text-amber-600" />
                    <Badge className="bg-amber-600">
                      <TrendingUp className="w-4 h-4" />
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">सामग्री व कुशल मजदूरी</p>
                  <p className="text-xs text-muted-foreground mb-2">Material & Skilled Wages</p>
                  <h3 className="text-3xl">{Number(record.Material_and_skilled_Wages).toFixed(2)}</h3>
                  {/* <p className="text-xs text-muted-foreground mt-1">लाख / Lakh</p> */}
                  {/* <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12% from last month</span>
                  </div> */}
                </div>

                {/* Administrative Expenditure */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-lg border-2 border-orange-200">
                  <div className="flex items-center justify-between mb-3">
                    <Building2 className="w-8 h-8 text-orange-600" />
                    <Badge className="bg-orange-600">
                      <TrendingDown className="w-4 h-4" />
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">प्रशासनिक व्यय</p>
                  <p className="text-xs text-muted-foreground mb-2">Administrative Expenditure</p>
                  <h3 className="text-3xl">{Number(record.Total_Adm_Expenditure).toFixed(2)}</h3>
                  {/* <p className="text-xs text-muted-foreground mt-1">लाख / Lakh</p> */}
                  {/* <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                    <TrendingDown className="w-4 h-4" />
                    <span>-2% from last month</span>
                  </div> */}
                </div>

                {/* Persondays of Central Liability */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-5 rounded-lg border-2 border-pink-200">
                  <div className="flex items-center justify-between mb-3">
                    <UserCheck className="w-8 h-8 text-pink-600" />
                    <Badge className="bg-pink-600">व्यक्ति-दिवस</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">केंद्रीय दायित्व</p>
                  <p className="text-xs text-muted-foreground mb-2">Central Liability Persondays</p>
                  <h3 className="text-3xl">{record.Persondays_of_Central_Liability_so_far}</h3>
                  <p className="text-xs text-muted-foreground mt-1">व्यक्ति-दिवस / Person-days</p>
                </div>
              </div>
            </Card>

            {/* Expenditure Composition Chart */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <PieChartIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl">📊 व्यय संरचना / Expenditure Composition</h3>
                  <p className="text-sm text-muted-foreground">खर्च का विभाजन / Breakdown of Expenses</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={expenditureCompositionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(obj) => `${obj.value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expenditureCompositionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center gap-4">
                  {expenditureCompositionData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-6 h-6 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span>{item.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xl">{Number(item.value).toFixed(2)}</p>
                        {/* <p className="text-xs text-muted-foreground">Lakh</p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Sector-Wise Distribution */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl">🌾 क्षेत्रवार वितरण / Sector-Wise Distribution</h3>
                  <p className="text-sm text-muted-foreground">कार्य श्रेणी / Work Categories</p>
                </div>
              </div>

              <div className="space-y-4">
                {sectorDistributionData.map((sector, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">{sector.name}</span>
                      <Badge className="bg-green-600">{sector.value}%</Badge>
                    </div>
                    <Progress value={sector.value} className="h-3" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Monthly Trend - Bar Chart */}
            {/* <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl">🧾 मासिक व्यय प्रवृत्ति / Monthly Expenditure Trend</h3>
                  <p className="text-sm text-muted-foreground">इस वर्ष की तुलना / This Year Comparison</p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={expenditureTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="exp" fill="#8b5cf6" name="Expenditure (₹ Lakh)" />
                </BarChart>
              </ResponsiveContainer>
            </Card> */}
          </TabsContent>

          {/* TAB 3: Demographics & Employment */}
          <TabsContent value="demographics" className="space-y-6">
            {/* Employment Provided Section */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl">👨‍👩‍👧 रोजगार प्रदान किया / Employment Provided</h3>
                  <p className="text-sm text-muted-foreground">रोजगार सारांश / Employment Summary</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Total Households Worked */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <Users className="w-8 h-8 text-blue-600" />
                    {/* <Badge className="bg-blue-600">
                      <TrendingUp className="w-4 h-4" />
                    </Badge> */}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">कार्यरत परिवार</p>
                  <p className="text-xs text-muted-foreground mb-2">Total Households Worked</p>
                  <h3 className="text-3xl mb-3">{record.Total_Households_Worked}</h3>
                  {/* Mini sparkline simulation */}
                  {/* <div className="h-8 flex items-end gap-1">
                    {[40, 50, 45, 60, 55, 70, 65, 80].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-blue-400 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div> */}
                </div>

                {/* Total Individuals Worked */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg border-2 border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <UserCheck className="w-8 h-8 text-purple-600" />
                    {/* <Badge className="bg-purple-600">
                      <TrendingUp className="w-4 h-4" />
                    </Badge> */}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">कुल कामगार</p>
                  <p className="text-xs text-muted-foreground mb-2">Total Individuals Worked</p>
                  <h3 className="text-3xl mb-3">{record.Total_Individuals_Worked}</h3>
                  {/* <div className="h-8 flex items-end gap-1">
                    {[50, 45, 55, 60, 65, 70, 75, 85].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-purple-400 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div> */}
                </div>

                {/* Average Days per HH */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border-2 border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <Calendar className="w-8 h-8 text-green-600" />
                    {/* <Badge className="bg-green-600">36 दिन</Badge> */}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">औसत रोजगार दिवस</p>
                  <p className="text-xs text-muted-foreground mb-2">Avg Days per HH</p>
                  <h3 className="text-3xl mb-3">{record.Average_days_of_employment_provided_per_Household}</h3>
                  {/* <div className="h-8 flex items-end gap-1">
                    {[30, 32, 34, 33, 35, 34, 36, 36].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-green-400 rounded-t"
                        style={{ height: `${(height/40)*100}%` }}
                      ></div>
                    ))}
                  </div> */}
                </div>

                {/* HHs Completed 100 Days */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-lg border-2 border-amber-200">
                  <div className="flex items-center justify-between mb-3">
                    <CheckCircle className="w-8 h-8 text-amber-600" />
                    {/* <Badge className="bg-amber-600">🏆</Badge> */}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">100 दिन पूर्ण</p>
                  <p className="text-xs text-muted-foreground mb-2">HHs Completed 100 Days</p>
                  <h3 className="text-3xl mb-3">{record.Total_No_of_HHs_completed_100_Days_of_Wage_Employment}</h3>
                  {/* <div className="h-8 flex items-end gap-1">
                    {[20, 30, 40, 50, 60, 70, 80, 100].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-amber-400 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div> */}
                </div>

                {/* Differently Abled Persons */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-lg border-2 border-orange-200">
                  <div className="flex items-center justify-between mb-3">
                    <UserCheck className="w-8 h-8 text-orange-600" />
                    {/* <Badge className="bg-orange-600">समावेशन</Badge> */}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">दिव्यांग कामगार</p>
                  <p className="text-xs text-muted-foreground mb-2">Differently Abled Persons</p>
                  <h3 className="text-3xl mb-3">{record.Differently_abled_persons_worked}</h3>
                  {/* <div className="h-8 flex items-end gap-1">
                    {[60, 65, 70, 68, 72, 75, 78, 80].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-orange-400 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div> */}
                </div>
              </div>
            </Card>

            {/* Worker Demographics */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl">👩‍🌾 कामगार जनसांख्यिकी / Worker Demographics</h3>
                  <p className="text-sm text-muted-foreground">सामाजिक वर्ग विवरण / Social Category Details</p>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 bg-gray-50">श्रेणी / Category</th>
                      <th className="text-right py-3 px-4 bg-gray-50">संख्या / Metric</th>
                      {/* <th className="text-right py-3 px-4 bg-gray-50">प्रतिशत / %</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                          <span>महिला व्यक्ति-दिवस / Women Persondays</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">{record.Women_Persondays}</td>
                      {/* <td className="text-right py-3 px-4">
                        <Badge className="bg-pink-500">49.6%</Badge>
                      </td> */}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span>SC व्यक्ति-दिवस / SC Persondays</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">{record.SC_persondays}</td>
                      {/* <td className="text-right py-3 px-4">
                        <Badge className="bg-purple-500">15.3%</Badge>
                      </td> */}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>ST व्यक्ति-दिवस / ST Persondays</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">{record.ST_persondays}</td>
                      {/* <td className="text-right py-3 px-4">
                        <Badge className="bg-blue-500">0.2%</Badge>
                      </td> */}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                          <span>SC सक्रिय कामगार / SC Against  Active Workers</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">{record.SC_workers_against_active_workers}</td>
                      {/* <td className="text-right py-3 px-4">
                        <Badge className="bg-purple-600">39%</Badge>
                      </td> */}
                    </tr>
                    <tr>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          <span>ST सक्रिय कामगार / ST Against Active Workers</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">{record.ST_workers_against_active_workers}</td>
                      {/* <td className="text-right py-3 px-4">
                        <Badge className="bg-blue-600">0.4%</Badge>
                      </td> */}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Charts */}
              {/* <div className="grid md:grid-cols-2 gap-6">
                Stacked Bar Chart
                <div>
                  <h4 className="mb-3">व्यक्ति-दिवस वितरण / Persondays Distribution</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={[{ name: 'Persondays', Women: record.Women_Persondays, SC: record.SC_persondays, ST: record.ST_persondays }]} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip />
                      <Bar dataKey="Women" stackId="a" fill="#ec4899" name="Women" />
                      <Bar dataKey="SC" stackId="a" fill="#8b5cf6" name="SC" />
                      <Bar dataKey="ST" stackId="a" fill="#3b82f6" name="ST" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                Pie Chart - Women Participation
                <div>
                  <h4 className="mb-3">महिला भागीदारी / Women Participation</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Women', value: 49.6, color: '#ec4899' },
                          { name: 'Others', value: 50.4, color: '#cbd5e1' }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell fill="#ec4899" />
                        <Cell fill="#cbd5e1" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div> */}
            </Card>

            {/* Job Cards & Active Workers */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl">📋 जॉब कार्ड और सक्रिय कामगार / Job Cards & Active Workers</h3>
                  <p className="text-sm text-muted-foreground">पंजीकरण विवरण / Registration Details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Job Cards Issued */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border-2 border-blue-200 text-center">
                  <CreditCard className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">कुल जॉब कार्ड</p>
                  <p className="text-xs text-muted-foreground mb-2">Total Job Cards Issued</p>
                  <h3 className="text-3xl">{record.Total_No_of_JobCards_issued}</h3>
                </div>

                {/* Total Active Job Cards */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border-2 border-green-200 text-center">
                  <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">सक्रिय जॉब कार्ड</p>
                  <p className="text-xs text-muted-foreground mb-2">Active Job Cards</p>
                  <h3 className="text-3xl">{record.Total_No_of_Active_Job_Cards}</h3>
                  <p className="text-xs text-green-600 mt-1"> सक्रिय / Active</p>
                </div>

                {/* Total Workers */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg border-2 border-purple-200 text-center">
                  <Users className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">कुल कामगार</p>
                  <p className="text-xs text-muted-foreground mb-2">Total Workers</p>
                  <h3 className="text-3xl">{record.Total_No_of_Workers}</h3>
                </div>

                {/* Total Active Workers */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-lg border-2 border-orange-200 text-center">
                  <UserCheck className="w-10 h-10 text-orange-600 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">सक्रिय कामगार</p>
                  <p className="text-xs text-muted-foreground mb-2">Active Workers</p>
                  <h3 className="text-3xl">{record.Total_No_of_Active_Workers}</h3>
                  <p className="text-xs text-orange-600 mt-1"> सक्रिय / Active</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
