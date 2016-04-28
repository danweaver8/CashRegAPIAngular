using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularCashRegAPI2.Models
{
    public class StateManager
    {
        readonly List<States> _states = new List<States>() {
            new States  { State= "AL", tax=13.5m },
            new States  { State= "AK", tax= 7m },
            new States  { State= "AZ", tax= 10.725m },
            new States  { State= "AR", tax= 11.625m },
            new States  { State= "CA", tax= 10.0m },
            new States  { State= "CO", tax= 10.0m },
            new States  { State= "CT", tax= 6.35m },
            new States  { State= "DE", tax= 0.0m },
            new States  { State= "FL", tax= 7.5m },
            new States  { State= "GA", tax= 8m },
            new States  { State= "HI", tax= 4.712m },
            new States  { State= "ID", tax= 8.5m },
            new States  { State= "IL", tax= 9.75m },
            new States  { State= "IN", tax= 7.0m },
            new States  { State= "IA", tax= 7.0m },
            new States  { State= "KS", tax= 9.65m },
            new States  { State= "KY", tax= 6m },
            new States  { State= "LA", tax= 11m },
            new States  { State= "ME", tax= 5.5m },
            new States  { State= "MD", tax= 6m },
            new States  { State= "MA", tax= 6.25m },
            new States  { State= "MI", tax= 6.0m },
            new States  { State= "MN", tax= 7.875m },
            new States  { State= "MS", tax= 7.25m },
            new States  { State= "MO", tax= 10.85m },
            new States  { State= "MT", tax= 0.0m },
            new States  { State= "NE", tax= 7.5m },
            new States  { State= "NV", tax= 8.1m },
            new States  { State= "NH", tax= 0.0m },
            new States  { State= "NJ", tax= 7.0m },
            new States  { State= "NM", tax= 8.688m },
            new States  { State= "NY", tax= 8.875m },
            new States  { State= "NC", tax= 7.5m },
            new States  { State= "ND", tax= 8.0m },
            new States  { State= "OH", tax= 8.0m },
            new States  { State= "OK", tax= 11.0m },
            new States  { State= "OR", tax= 0.0m },
            new States  { State= "PA", tax= 8.0m },
            new States  { State= "RI", tax= 7.0m },
            new States  { State= "SC", tax= 9.0m },
            new States  { State= "SD", tax= 6.0m },
            new States  { State= "TN", tax= 9.75m },
            new States  { State= "TX", tax= 8.25m },
            new States  { State= "UT", tax= 8.35m },
            new States  { State= "VT", tax= 7.0m },
            new States  { State= "VA", tax= 6.0m },
            new States  { State= "WA", tax= 9.6m },
            new States  { State= "WV", tax= 7.0m },
            new States  { State= "WI", tax= 5.6m },
            new States  { State= "WY", tax= 6.0m }
            };
        public IEnumerable<States> GetAll { get { return _states; } }
    }
}
