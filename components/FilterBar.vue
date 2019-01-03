/* File: components/FilterBar.vue */


<template>
    <thead class="filter-bar">
        <tr>
            <th style="width:300px">Name</th>

            <th>
                State<br>
                <select id="state" @change="$emit('on-filter-change', $event)">
                    <option value="">All</option>
                    <option>CA</option>
                    <option>FL</option>
                    <option>MN</option>
                    <option>NY</option>
                    <option>WA</option>
                </select>
            </th>

            <th>
                Party<br>
                <select id="party" @change="$emit('on-filter-change', $event)">
                    <option value="">All</option>
                    <option>Democrat</option>
                    <option>Independent</option>
                    <option>Republican</option>
                </select>
            </th>

            <th>
                Chamber<br>
                <select id="chamber" @change="$emit('on-filter-change', $event)">
                    <option value="">All</option>
                    <option>House</option>
                    <option>Senate</option>
                </select>
            </th>
            
            <th>
                Website
            </th>

        </tr>
    </thead>
</template>


<style>
    thead {
        background-color: #eee;
    }
</style>