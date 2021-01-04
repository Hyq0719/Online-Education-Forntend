<template>
  <div class="container">
    <h3 class="tiltlefont">精彩手记</h3>
    <div>
      <passage class='passage' :img=picture[0] :content=content[0]></passage>
      <passage class='passage' :img=picture[0] :content=content[1]></passage>
      <passage class='passage_last' :content=content[2]></passage>
    </div>
    <div>
      <passage class='passage' :img=picture[0] :content=content[3]></passage>
      <passage class='passage' :img=picture[0] :content=content[4]></passage>
      <passage class='passage_last' :content=content[5]></passage>
    </div>
  </div>
</template>

<style>
.passage {
  position: relative;
  width: 500px;
  height: 300px;
  margin: 0 48px 24px 0;
  background: #FFFFFF;
  box-shadow: 0 6px 10px 0 rgba(95, 101, 105, 0.15);
  border-radius: 8px;
  float: left;
}

.passage_last {
  position: relative;
  width: 500px;
  height: 300px;
  margin: 0 0 24px 0;
  background: #FFFFFF;
  box-shadow: 0 6px 10px 0 rgba(95, 101, 105, 0.15);
  border-radius: 8px;
  float: left;
}

.tiltlefont {
  text-align: center;
  font-size: 20px;
  color: #4d555d;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: 1px;
}

.container {
  width: 1596px;
  margin-left: auto;
  margin-right: auto;
  padding: 32px 0;
  /*border: 3px solid #B3C0D1;*/
}
</style>

<script>
import passage from './childcpn/passage'

export default {
  name: 'Article',
  components: {
    passage
  },
  data() {
    return {
      picture: [require('@/assets/user1.jpg')],
      content: ["1、服务器\n" + "专指某些高性能计算机，能通过网络，对外提供服务。\n" + "在CPU、芯片组、内存、磁盘系统、网络等硬件和普通电脑有所不同。服务器是网络的节点，存储、处理网络上80%的数据、信息，在网络中起到举足轻重的作用。它们是为客户端计算机提供各种服务的高性能的计算机，服务器主要有网络服务器（DNS、DHCP）、打印服务器、终端服务器、磁盘服务器、邮件服务器、文件服务器等。超级计算机（Supercomputers）通常是指由数百数千甚至更多的处理器（机）组成的、能计算普通PC机和服务器不能完成的大型复杂课题的计算机。超级计算机拥有最强的并行计算能力，主要用于科学计算。在气象、军事、能源、航天、探矿等领域承担大规模、高速度的计算任务。现代超级计算机较多采用集群系统，更注重浮点运算的性能，可看着是一种专注于科学计算的高性能服务器，而且价格非常昂贵。无盘工作站的工作原理是由网卡的启动芯片（BootROM）以不同的形式向服务器发出启动请求号，服务器收到后，根据不同的机制，向工作站发送启动数据.",
        "2、工作站\n" + "是一种以个人计算机和分布式网络计算为基础，主要面向专业应用领域，具备强大的数据运算与图形、图像处理能力，为满足工程设计、动画制作、科学研究、软件开发、金融管理、信息服务、模拟仿真等专业领域而设计开发的高性能计算机。工作站最突出的特点是具有很强的图形交换能力。\n" + "无盘工作站是指无软盘、无硬盘、无光驱连入局域网的计算机。在网络系统中，把工作站端使用的操作系统和应用软件被全部放在服务器上，系统管理员只要完成服务器上的管理和维护，软件的升级和安装也只需要配置一次后，则整个网络中的所有计算机就都可以使用新软件。所以无盘工作站具有节省费用、系统的安全性高、易管理性和易维护性等优点，这对网络管理员来说具有很大的吸引力。",
        "无盘工作站的工作原理是由网卡的启动芯片（BootROM）以不同的形式向服务器发出启动请求号，服务器收到后，根据不同的机制，向工作站发送启动数据，工作站下载完启动数据后，系统控制权由BootROM转到内存中的某些特定区域，并引导操作系统。",
        "3、集线器\n" + "集线器（HUB）是一种共享介质的网络设备，它的作用可以简单的理解为将一些机器连接起来组成一个局域网，HUB 本身不能识别目的地址。集线器上的所有端口争用一个共享信道的宽带，因此随着网络节点数量的增加，数据传输量的增大，每节点的可用带宽将随之减少。集线器采用广播的形式传输数据，即向所有端口传送数据。",
        "是一种以个人计算机和分布式网络计算为基础，主要面向专业应用领域，具备强大的数据运算与图形、图像处理能力，为满足工程设计、动画制作、科学研究、软件开发、金融管理、信息服务、模拟仿真等专业领域而设计开发的高性能计算机。工作站最突出的特点是具有很强的图形交换能力。\n" +
        "无盘工作站是指无软盘、无硬盘、无光驱连入局域网的计算机。在网络系统中，把工作站端使用的操作系统和应用软件被全部放在服务器上，系统管理员只要完成服务器上的管理和维护，软件的升级和安装也只需要配置一次后，则整个网络中的所有计算机就都可以使用新软件。所以无盘工作站具有节省费用、系统的安全性高、易管理性和易维护性等优点，这对网络管理员来说具有很大的吸引力。",
        "计算机（computer）俗称电脑，是现代一种用于高速计算的电子计算机器，可以进行数值计算，又可以进行逻辑计算，还具有存储记忆功能。是能够按照程序运行，自动、高速处理海量数据的现代化智能电子设备。\n" + "（1）分类：可分为超级计算机、工业控制计算机、网络计算机、个人计算机、嵌入式计算机五类"]
    }
  }
}
</script>
