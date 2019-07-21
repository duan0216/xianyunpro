<template>
    <div class="aside">
    

        <div class="history">
            <h5>草稿箱</h5>
            <nuxt-link to="#">
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="history-item">
                    <div class="air-info">
                        <div class="to-from">
                            我是谁
                            <span class="el-icon-edit"></span>

                        </div>
                        <p>2019-06-16</p>
                    </div>
               
                </el-row>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.statement{
    border:1px #ddd solid;

    .statement-list{
        padding: 10px 0;
        > div{
            text-align: center;
            i{
                display: block;
                font-size: 40px;
            }
            span{
                font-size:12px;
            }
        }
    }
    .service-tel{
        height: 32px;
        line-height: 32px;
        padding:0 10px;
        background: #f6f6f6;
        font-size: 14px;
    }
}

.history{
    border:1px #ddd solid;
    padding:10px;
    margin-top:10px;

    h5{
        font-size: 16px;
        font-weight: normal;
        padding-bottom: 10px;
        border-bottom:1px #eee solid;
    }

    .history-item{
        padding:10px 0;
        font-size: 14px;
        border-bottom: 1px #eee solid;

        &:last-child{
            border:none;
        }

        .to-from{
            margin-bottom: 5px;
        }

        p{
            font-size: 12px;
            color:#666;
        }

       
    }
}
</style>