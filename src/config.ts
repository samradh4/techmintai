export const SITE = {
  name: 'TechMintAI',
  url: 'https://techmintai.com',
  tagline: 'Smarter money. Better technology.',
  description: 'Clear, practical guides to personal finance, artificial intelligence, fintech and useful technology.',
  contact: import.meta.env.PUBLIC_CONTACT_EMAIL || 'hello@techmintai.com',
};
export const categories = [
  { slug: 'finance', name: 'Finance', description: 'Budget, save and make informed money decisions.' },
  { slug: 'investing', name: 'Investing', description: 'Understand long-term investing concepts and risks.' },
  { slug: 'fintech', name: 'Fintech', description: 'Digital payments, online banking and financial technology.' },
  { slug: 'ai', name: 'AI', description: 'Practical artificial intelligence for work and life.' },
  { slug: 'technology', name: 'Technology', description: 'Security, privacy and emerging tech explained.' },
  { slug: 'software', name: 'Software', description: 'Choose better tools and simplify workflows.' },
];
export const tools = [
  {slug:'compound-interest',name:'Compound Interest Calculator',description:'Estimate how savings grow with annual compounding and monthly contributions.',emoji:'↗'},
  {slug:'monthly-investment',name:'Monthly Investment Calculator',description:'Project long-term savings from recurring monthly contributions.',emoji:'◷'},
  {slug:'loan-payment',name:'Loan Payment Calculator',description:'Estimate fixed monthly loan payments, interest and repayment totals.',emoji:'▤'},
  {slug:'savings-goal',name:'Savings Goal Calculator',description:'Estimate the monthly deposit needed to reach a future target.',emoji:'◎'},
];
export const canonical = (path: string) => new URL(path.replace(/^\/+/, ''), SITE.url + '/').toString();
