<style lang="css">



</style>

<template lang="html">

<div>
    <div class="form">
    </div>
    <h5>Ram</h5>
    <div class="progress">
        <div class="progress-bar progress-bar-default" role="progressbar" :style="'width:'+convertPercent(limits.totalRAMUsed, limits.maxTotalRAMSize)[0]+'%'">
            {{normalizeRamSize(limits.totalRAMUsed)}} Used
        </div>
        <div class="progress-bar progress-bar-warning" role="progressbar" :style="'width:'+convertPercent(flavor.ram, limits.maxTotalRAMSize)[0]+'%'">
            {{normalizeRamSize(flavor.ram)}}
        </div>
        <div class="progress-bar progress-bar-success" role="progressbar" :style="'width:'+convertPercent(parseFloat(flavor.ram)+parseFloat(limits.totalRAMUsed), limits.maxTotalRAMSize)[1]+'%'">
            {{normalizeRamSize(limits.maxTotalRAMSize - (limits.totalRAMUsed + flavor.ram))}} Free
        </div>
    </div>
    <h5>Disk</h5>
    <div class="progress">
        <div class="progress-bar progress-bar-default" role="progressbar" :style="'width:'+convertPercent(limits.totalDiskUsed, limits.maxDiskSize)[0]+'%'">
            {{limits.totalDiskUsed}} GB Used
        </div>
        <div class="progress-bar progress-bar-warning" role="progressbar" :style="'width:'+convertPercent(flavor.disk, limits.maxDiskSize)[0]+'%'">
            {{flavor.disk}} GB
        </div>
        <div class="progress-bar progress-bar-success" role="progressbar" :style="'width:'+convertPercent(parseFloat(flavor.disk)+parseFloat(limits.totalDiskUsed), limits.maxDiskSize)[1]+'%'">
            {{(limits.maxDiskSize - (limits.totalDiskUsed + flavor.disk))}} Free
        </div>
    </div>
    <h5>CPU</h5>
    <div class="progress">
        <div class="progress-bar progress-bar-default" role="progressbar" :style="'width:'+convertPercent(limits.totalCoresUsed, limits.maxTotalCores)[0]+'%'">
            {{limits.totalCoresUsed}} Used
        </div>
        <div class="progress-bar progress-bar-warning" role="progressbar" :style="'width:'+convertPercent(flavor.vcpus, limits.maxTotalCores)[0]+'%'">
            {{flavor.vcpus}} Cores
        </div>
        <div class="progress-bar progress-bar-success" role="progressbar" :style="'width:'+convertPercent(parseFloat(flavor.vcpus)+parseFloat(limits.totalCoresUsed), limits.maxTotalCores)[1]+'%'">
            {{(limits.maxTotalCores - (limits.totalCoresUsed + flavor.vcpus))}} Free
        </div>
    </div>

</div>

</template>

<script>

export default {
    props: {
        flavor: {
            type: Object,
            required: true
        },
        limits: {
            type: Object,
            required: true
        }
    },
    computed() {
        var self = this;
    },
    methods: {
        convertPercent(sub, total) {
                var sub = parseFloat(sub);
                var total = parseFloat(total);
                return [(sub * 100) / total, 100 - (sub * 100) / total]
            },
            normalizeRamSize(val) {
                var ram = parseFloat(val);
                if (ram < 1024) {
                    return ram + " MB"
                } else {
                    return (ram / 1024) + " GB"
                }
            },
            normalizeDiskSize(val) {
                var ram = parseFloat(val);
                if (ram < 1024) {
                    return ram + " MB"
                } else {
                    return (ram / 1024) + " GB"
                }
            }

    }
}

</script>
