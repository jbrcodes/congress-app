<!-- components/CongressContribs.vue -->


<template>
    <div class="congress-contribs">
        <h2>Contributors (2016 Election Cycle)</h2>
        <template v-if="contribs">
            <table>
                <tr>
                    <th>Number of Contributions</th>
                    <td class="text-align-right">{{ contribs.summary.trans_count | myNumFormat(0) }} </td>
                </tr>
                <tr>
                    <th>Total Amount</th>
                    <td class="text-align-right">${{ contribs.summary.trans_total | myNumFormat(0) }}</td>
                </tr>
            </table>
            
            <h3>Top 5 Contributors</h3>
            
            <table>
                <tr>
                    <th>Name</th>
                    <th class="text-align-right">Total Amount</th>
                </tr>
            
                <tr v-for="d in contribs.top_5_donors" :key="d.donor_name">
                    <td>{{ d.donor_name }}</td>
                    <td class="text-align-right">${{ d.trans_amount|myNumFormat(0) }}</td>
                </tr>
            </table>
        </template>
        
        <template v-else>
            (Data not available)
        </template>
    </div>
</template>


<script>
    import * as cd from '../CongressData.js';
    
    export default {
        
        props: {
            memberId: String
        },
        
        data: function () {
            return {
                contribs: null
            }
        },
        
        created: function () {
            var esto = this;
            cd.GetContributions(this.memberId, function (contribs) {
                esto.contribs = contribs;
            });
        },
        
        filters: {
            myNumFormat: function (num, places) {
                var str = num.toFixed(places).toString();
                var pIx = str.indexOf('.');
                if (pIx == -1)
                    pIx = str.length;
                var arr = str.split('');
                for (var i=pIx-3; i>0; i-=3)
                    arr.splice(i, 0, ',');
                str = arr.join('');

                return str;
            }
        }
        
    };
</script>