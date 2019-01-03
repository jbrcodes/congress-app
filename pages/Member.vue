<!-- pages/Member.vue -->


<template>
    <f7-page>
        <f7-navbar v-if="mem" :title="'Senator '+mem.full_name" back-link="Back">
            <f7-nav-right>
                <f7-link panel-open="right"><f7-icon fa="bars"></f7-icon></f7-link>
            </f7-nav-right>
        </f7-navbar>
        
        <f7-block v-if="mem">
            <h1>{{ mem.full_name }}</h1>
            <div class="jbr-flex-row">
                <div class="jbr-flex-col-table">
                    <table>
                        <tr>
                            <th>State</th>
                            <td>{{ mem.state.label }}</td>
                        </tr>
                        <tr>
                            <th>Party</th>
                            <td>{{ mem.party }}</td>
                        </tr>
                        <tr>
                            <th>Date of Birth</th>
                            <td>{{ mem.date_of_birth | formatDate }}</td>
                        </tr>
                    </table>
                </div>
                
                <div class="jbr-flex-col-img">
                    <img :src="'https://theunitedstates.io/images/congress/225x275/'+memId+'.jpg'" :alt="'(Portrait of '+mem.full_name+')'">
                </div>
            </div> <!-- .jbr-flex-row -->
            
            
            <h2>Online</h2>
            
            <table>
                <tr>
                    <th>Web Site</th>
                    <td><f7-link :href="mem.url">{{ mem.url | snipUrl }}</f7-link></td>
                </tr>
                <tr v-if="mem.facebook_account">
                    <th>Facebook</th>
                    <td><f7-link :href="'https://www.facebook.com/'+mem.facebook_account" external>{{ mem.facebook_account }}</f7-link></td>
                </tr>
                <tr v-if="mem.twitter_account">
                    <th>Twitter</th>
                    <td><f7-link :href="'https://twitter.com/'+mem.twitter_account" external>@{{ mem.twitter_account }}</f7-link></td>
                </tr>
                <tr v-if="mem.youtube_account">
                    <th>YouTube</th>
                    <td><f7-link :href="'https://www.youtube.com/user/'+mem.youtube_account" external>{{ mem.youtube_account }}</f7-link></td>
                </tr>
            </table>
            
            
            <h2>Activity</h2>
            
            <table>
                <tr>
                    <th>Bills Sponsored</th>
                    <td>{{ mem.role.bills_sponsored }}</td>
                </tr>
                <tr>
                    <th>Bills Cosponsored</th>
                    <td>{{ mem.role.bills_cosponsored }}</td>
                </tr>
                <tr>
                    <th>Missed Votes</th>
                    <td>{{ mem.role.missed_votes_pct }}%</td>
                </tr>
                <tr>
                    <th>Votes With Party</th>
                    <td>{{ mem.role.votes_with_party_pct }}%</td>
                </tr>
            </table>
            
            
            <h2>Committee Assignments</h2>
            
            <ul>
                <li v-for="c in mem.role.committees" :key="c.code">
                    {{ c.name }}
                </li>
            </ul>
            
            
            <congress-contribs :member-id="memId" />
            
        </f7-block>
    </f7-page>
</template>


<script>
    import * as cd from '../CongressData.js';
    import CongressContribs from '../components/CongressContribs.vue';
    
    export default {

        data: function () {
            return {
                memId: '',  // available now
                mem: null
            }
        },

        created: function () {
            this.memId = this.$f7route.params.memberId;
            var esto = this;
            cd.GetMember(this.memId, function (mem) {
                esto.mem = mem;
            });
        },
        
        components: {
            'congress-contribs': CongressContribs
        },
        
        filters: {
            formatDate: function (val) {
                var myArr = val.match(/(\d{4})-(\d\d)-(\d\d)/);
                // yuk...
                var m = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
                         '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
                         '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec' };
                
                return myArr[3] + ' ' + m[ myArr[2] ] + ' ' + myArr[1];
            },
            
            snipUrl: function (url) {
                return url.replace(/https?:\/\//, '');
            }
        }
        
    };
</script>

<style>
    .jbr-flex-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .jbr-flex-col-img {
        text-align: right;
    }
    .jbr-flex-col-table {
        width: 75%;
    }
    
    @media only screen and (max-width: 500px) {
        .jbr-flex-row {
            flex-direction: column-reverse;
        }
        .jbr-flex-col-img {
            text-align: left;
            width: 50%;
        }
        .jbr-flex-col-table {
            width: 100%;
        }
    }
    
    h1 {
        font-size: 1.5rem;
    }
    
    h2 {
        font-size: 1.25rem;
        background-color: #eee;
        padding: 5px;
        margin-bottom: 0.5em;
    }
    
    h3 {
        font-size: 1rem;
        border-bottom: 1px solid #ddd;
        margin-bottom: 0.5em;
    }
    
    table {
        width: 100%;
        font-size: 1rem;
        border-collapse: collapse;
    }
    tr {
        zz-border-top: 1px solid #aaa;
    }
    th, td {
        text-align: left;
        vertical-align: top;
    }
    th {
        width: 50%;
    }
    td {
        padding-left: 5px;
    }
    
    img {
        height: auto;
        width: 100%;
    }
</style>