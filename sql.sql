USE [master]
GO
/****** Object:  Database [purchaseorder]    Script Date: 4/21/2022 18:24:53 ******/
CREATE DATABASE [purchaseorder]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'purchaseorder', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.PHAMPCSQLSERVER\MSSQL\DATA\purchaseorder.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'purchaseorder_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.PHAMPCSQLSERVER\MSSQL\DATA\purchaseorder_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [purchaseorder] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [purchaseorder].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [purchaseorder] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [purchaseorder] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [purchaseorder] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [purchaseorder] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [purchaseorder] SET ARITHABORT OFF 
GO
ALTER DATABASE [purchaseorder] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [purchaseorder] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [purchaseorder] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [purchaseorder] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [purchaseorder] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [purchaseorder] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [purchaseorder] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [purchaseorder] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [purchaseorder] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [purchaseorder] SET  ENABLE_BROKER 
GO
ALTER DATABASE [purchaseorder] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [purchaseorder] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [purchaseorder] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [purchaseorder] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [purchaseorder] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [purchaseorder] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [purchaseorder] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [purchaseorder] SET RECOVERY FULL 
GO
ALTER DATABASE [purchaseorder] SET  MULTI_USER 
GO
ALTER DATABASE [purchaseorder] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [purchaseorder] SET DB_CHAINING OFF 
GO
ALTER DATABASE [purchaseorder] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [purchaseorder] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [purchaseorder] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [purchaseorder] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'purchaseorder', N'ON'
GO
ALTER DATABASE [purchaseorder] SET QUERY_STORE = OFF
GO
USE [purchaseorder]
GO
/****** Object:  User [adminpurchaseorder]    Script Date: 4/21/2022 18:24:53 ******/
CREATE USER [adminpurchaseorder] FOR LOGIN [adminpurchaseorder] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [adminpurchaseorder]
GO
/****** Object:  Table [dbo].[part]    Script Date: 4/21/2022 18:24:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[part](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[part_number] [nvarchar](50) NULL,
	[part_descripttion] [nvarchar](50) NULL,
	[manufacturer] [nvarchar](50) NULL,
 CONSTRAINT [PK_part] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[purchase_order]    Script Date: 4/21/2022 18:24:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[purchase_order](
	[order_no] [int] IDENTITY(1,1) NOT NULL,
	[id_supplier] [int] NOT NULL,
	[order_date] [datetime] NULL,
	[last_update] [datetime] NULL,
	[send_email] [bit] NULL,
	[cancel_po] [bit] NULL,
	[note] [nvarchar](500) NULL,
	[address] [nvarchar](500) NULL,
	[country] [nvarchar](255) NULL,
	[post_code] [nvarchar](50) NULL,
	[order_send_from_email] [nvarchar](500) NULL,
	[order_send_to_email] [nvarchar](500) NULL,
	[order_send_to_email_cc] [nvarchar](500) NULL,
	[email_subject] [nvarchar](255) NULL,
	[email_content] [ntext] NULL,
 CONSTRAINT [PK_purchase_order] PRIMARY KEY CLUSTERED 
(
	[order_no] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[purchase_order_line]    Script Date: 4/21/2022 18:24:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[purchase_order_line](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_purchase_order] [int] NOT NULL,
	[id_part] [int] NOT NULL,
	[order_date] [datetime] NULL,
	[qty_ordered] [int] NULL,
	[qty_delivered] [int] NULL,
	[back_order] [bit] NULL,
	[m2_buy_price] [float] NULL,
	[memo] [nvarchar](255) NULL,
	[status] [bit] NOT NULL,
 CONSTRAINT [PK_purchase_order_line] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[supplier]    Script Date: 4/21/2022 18:24:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[supplier](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[supplier_shortname] [nvarchar](255) NULL,
	[supplier_name] [nvarchar](255) NULL,
	[stock_site] [nvarchar](50) NULL,
	[stock_name] [nvarchar](50) NULL,
 CONSTRAINT [PK_supplier] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user]    Script Date: 4/21/2022 18:24:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](25) NOT NULL,
	[password] [nvarchar](50) NOT NULL,
	[token] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_user] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[part] ON 

INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (1, N'123y7qywe7s', N'canon print x', N'Canon')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (2, N'18273876hks', N'canon print xxl', N'Canon')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (3, N'127huashd87', N'ram 8gb laptop', N'samsung')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (4, N'1weqjn2uhe2', N'ram 16gb laptop', N'samsung')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (5, N'12178ysadhj2', N'ram 8gb desktop', N'samsung')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (6, N'2enjk23hbah', N'ram 16gb desktop', N'samsung')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (7, N'asdjknkj2njka', N'cpu i5 10', N'intel')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (8, N'asdjnkj2jia441', N'cpu i7 10', N'intel')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (9, N'asdkjjih232hy', N'disk 500gb', N'kingmax')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (10, N'asdh2324hjb2', N'disk 1000gb', N'kingmax')
SET IDENTITY_INSERT [dbo].[part] OFF
GO
SET IDENTITY_INSERT [dbo].[purchase_order] ON 

INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (1, 1, CAST(N'2016-02-20T00:00:00.000' AS DateTime), CAST(N'2022-04-15T11:12:38.513' AS DateTime), 1, 0, NULL, N'ads', NULL, NULL, N'INTC@abc.com', N'INTEL@abc.com', N'asd@da', N'Order [ 1 - Intel Corporation ]', N'Dear Intel Corporation,

PO number : 1
This is email to order some product: 

	- 123y7qywe7s	1	1
	- 18273876hks	1	1

Best Regards,')
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (2, 1, CAST(N'2016-02-21T00:00:00.000' AS DateTime), CAST(N'2022-04-15T10:58:11.710' AS DateTime), 0, 0, N'note something 3', N' 27 quan 8', N'US', N'1829', NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (3, 2, CAST(N'2016-02-22T00:00:00.000' AS DateTime), CAST(N'2022-04-14T14:44:19.750' AS DateTime), 1, 0, NULL, NULL, NULL, NULL, N'005930KRX@abc.com', N'Samsung@abc.com', N'', N'Order [ 3 - Samsung Electronics Co Ltd ]', N'Dear Samsung Semiconductor,

PO number : 3
This is email to order some product: 

	- 127huashd87	1	1
	- 123y7qywe7s	1	1
	- 18273876hks	1	1
	- 1weqjn2uhe2	1	1

Best Regards,
Samsung Semiconductor')
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (4, 3, CAST(N'2016-02-20T01:00:00.000' AS DateTime), CAST(N'2022-04-14T11:44:27.010' AS DateTime), 1, 1, NULL, NULL, NULL, NULL, N'QCOM@abc.com', N'Qualcomm@abc.com', N'', N'Order [ 4 - Qualcomm Inc ]', N'Dear Qualcomm USA,

asda')
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (5, 4, CAST(N'2016-02-23T00:00:00.000' AS DateTime), CAST(N'2022-04-14T13:20:23.980' AS DateTime), 1, 0, NULL, N'Quận 7, Hồ Chí Minh, Việt Nam', N'Việt Nam', NULL, N'000660KRX@abc.com', N'SKHynix@abc.com', N'', N'Order [ 5 - SK Hynix Inc ]', N'Dear SK Hynix Inc,

PO number : 5
This is email to order some product: 

	- 12178ysadhj2	6	1.21
	- 123y7qywe7s	1	12
	- 18273876hks	1	1

Best Regards,
SK Hynix Inc')
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (6, 5, CAST(N'2016-02-20T02:00:00.000' AS DateTime), CAST(N'2016-04-25T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (7, 6, CAST(N'2016-02-24T00:00:00.000' AS DateTime), CAST(N'2022-04-07T09:09:38.417' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, N'AVGO@abc.com', N'Broadcom@abc.com', N'á@dsa.com', N'Order [ 7 - Broadcom Inc ]', N'Dear Broadcom Inc,

PO number : 7
This is email to order some product: 

	- asdjknkj2njka	1	1

Best Regards,
Broadcom Inc')
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (8, 1, CAST(N'2016-02-20T03:00:00.000' AS DateTime), CAST(N'2022-03-30T09:41:23.773' AS DateTime), 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (9, 2, CAST(N'2016-02-25T00:00:00.000' AS DateTime), CAST(N'2022-04-01T15:36:59.307' AS DateTime), 0, 0, NULL, N'Washington', N'US', N'121', NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (10, 3, CAST(N'2016-02-20T04:00:00.000' AS DateTime), CAST(N'2022-03-28T17:57:16.240' AS DateTime), 0, 0, N'day la bai test', N'Quận 7, Hồ Chí Minh, Việt Nam', N'Việt Nam', N'72912', NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (11, 4, CAST(N'2016-02-20T01:00:00.000' AS DateTime), CAST(N'2016-12-20T03:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (12, 5, CAST(N'2016-02-23T00:00:00.000' AS DateTime), CAST(N'2017-12-21T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (13, 6, CAST(N'2016-02-20T02:00:00.000' AS DateTime), CAST(N'2016-12-02T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (14, 7, CAST(N'2016-02-24T00:00:00.000' AS DateTime), CAST(N'2016-12-20T04:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (15, 8, CAST(N'2016-02-20T03:00:00.000' AS DateTime), CAST(N'2022-04-20T14:06:50.187' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (16, 9, CAST(N'2016-02-25T00:00:00.000' AS DateTime), CAST(N'2022-04-15T10:59:30.490' AS DateTime), 1, 0, NULL, NULL, NULL, NULL, N'6762TYO@abc.com', N'TDK@abc.com', N'', N'Order [ 16 - TDK Corp ]', N'Dear TDK Cor,

PO number : 16
This is email to order some product: 

	- 2enjk23hbah	1	1
	- 123y7qywe7s	1	1

Best Regards,
TDK Cor')
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (17, 10, CAST(N'2016-02-20T04:00:00.000' AS DateTime), CAST(N'2022-04-15T10:58:26.253' AS DateTime), 1, 1, NULL, NULL, NULL, NULL, N'2454TPE@abc.com', N'MediaTek@abc.com', N'sdahsbd@gmai.ocm', N'Order [ 17 - Media Tek Inc ]', N'Dear Media Tek Inc,

PO number : 17
This is email to order some product: 

	- asdjknkj2njka	1	1

Best Regards,
Media Tek Inc')
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (18, 7, CAST(N'2016-02-26T00:00:00.000' AS DateTime), CAST(N'2016-09-06T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (19, 8, CAST(N'2016-02-20T05:00:00.000' AS DateTime), CAST(N'2016-08-08T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (20, 9, CAST(N'2016-02-20T01:00:00.000' AS DateTime), CAST(N'2016-12-20T06:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (21, 10, CAST(N'2016-02-23T00:00:00.000' AS DateTime), CAST(N'2016-07-10T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (43, 5, CAST(N'2016-02-20T02:00:00.000' AS DateTime), CAST(N'2016-04-25T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (44, 6, CAST(N'2016-02-24T00:00:00.000' AS DateTime), CAST(N'2022-04-14T10:37:09.883' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, N'AVGO@abc.com', N'Broadcom@abc.com', N'á@dsa.com', N'Order [ 7 - Broadcom Inc ]', N'Dear Broadcom Inc,')
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (45, 1, CAST(N'2016-02-20T03:00:00.000' AS DateTime), CAST(N'2022-03-30T09:41:23.773' AS DateTime), 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (46, 2, CAST(N'2016-02-25T00:00:00.000' AS DateTime), CAST(N'2022-04-01T15:36:59.307' AS DateTime), 0, 0, NULL, N'Washington', N'US', N'121', NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (47, 3, CAST(N'2016-02-20T04:00:00.000' AS DateTime), CAST(N'2022-04-14T11:14:57.580' AS DateTime), 0, 1, N'day la bai test', N'Quận 7, Hồ Chí Minh, Việt Nam', N'Việt Nam', N'72912', NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (48, 4, CAST(N'2016-02-20T01:00:00.000' AS DateTime), CAST(N'2022-04-20T09:56:10.837' AS DateTime), 1, 0, NULL, NULL, NULL, NULL, N'000660KRX@abc.com', N'SKHynix@abc.com', N'', N'Order [ 48 - SK Hynix Inc ]', N'Dear SK Hynix Inc,

PO number : 48
This is email to order some product: 

	- 123y7qywe7s	1	1
	- 127huashd87	1	1

Best Regards,
SK Hynix Inc')
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (49, 6, CAST(N'2016-02-20T02:00:00.000' AS DateTime), CAST(N'2022-04-15T12:21:12.697' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (50, 7, CAST(N'2016-02-24T00:00:00.000' AS DateTime), CAST(N'2022-04-15T12:18:37.457' AS DateTime), 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (51, 8, CAST(N'2016-02-20T03:00:00.000' AS DateTime), CAST(N'2016-11-03T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (52, 9, CAST(N'2016-02-25T00:00:00.000' AS DateTime), CAST(N'2016-10-05T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (53, 10, CAST(N'2016-02-20T04:00:00.000' AS DateTime), CAST(N'2016-12-20T05:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (54, 7, CAST(N'2016-02-26T00:00:00.000' AS DateTime), CAST(N'2016-09-06T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (55, 3, CAST(N'2016-02-20T01:00:00.000' AS DateTime), CAST(N'2022-04-13T09:48:28.120' AS DateTime), 1, 0, NULL, NULL, NULL, NULL, N'QCOM@abc.com', N'Qualcomm@abc.com', N'', N'Order [ 4 - Qualcomm Inc ]', N'Dear Qualcomm USA,')
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (56, 4, CAST(N'2016-02-23T00:00:00.000' AS DateTime), CAST(N'2022-04-14T11:47:31.950' AS DateTime), 0, 0, NULL, N'Quận 7, Hồ Chí Minh, Việt Nam', N'Việt Nam', NULL, N'000660KRX@abc.com', N'SKHynix@abc.com', N'pham@cc.com', N'Order [ 5 - SK Hynix Inc ]', N'Dear SK Hynix Inc,')
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (57, 5, CAST(N'2016-02-20T02:00:00.000' AS DateTime), CAST(N'2016-04-25T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (58, 6, CAST(N'2016-02-24T00:00:00.000' AS DateTime), CAST(N'2022-04-07T09:09:38.417' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, N'AVGO@abc.com', N'Broadcom@abc.com', N'á@dsa.com', N'Order [ 7 - Broadcom Inc ]', N'Dear Broadcom Inc,')
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (59, 1, CAST(N'2016-02-20T03:00:00.000' AS DateTime), CAST(N'2022-03-30T09:41:23.773' AS DateTime), 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (60, 2, CAST(N'2016-02-25T00:00:00.000' AS DateTime), CAST(N'2022-04-14T11:16:44.720' AS DateTime), 0, 0, NULL, N'Washington', N'US', N'121', NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (61, 8, CAST(N'2016-02-20T03:00:00.000' AS DateTime), CAST(N'2016-11-03T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (62, 9, CAST(N'2016-02-25T00:00:00.000' AS DateTime), CAST(N'2016-10-05T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (63, 10, CAST(N'2016-02-20T04:00:00.000' AS DateTime), CAST(N'2016-12-20T05:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (64, 7, CAST(N'2016-02-26T00:00:00.000' AS DateTime), CAST(N'2016-09-06T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (65, 8, CAST(N'2016-02-20T05:00:00.000' AS DateTime), CAST(N'2016-08-08T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (66, 9, CAST(N'2016-02-20T01:00:00.000' AS DateTime), CAST(N'2016-12-20T06:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (67, 10, CAST(N'2016-02-23T00:00:00.000' AS DateTime), CAST(N'2016-07-10T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (68, 5, CAST(N'2016-02-20T02:00:00.000' AS DateTime), CAST(N'2016-04-25T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (69, 6, CAST(N'2016-02-24T00:00:00.000' AS DateTime), CAST(N'2022-04-07T09:09:38.417' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, N'AVGO@abc.com', N'Broadcom@abc.com', N'á@dsa.com', N'Order [ 7 - Broadcom Inc ]', N'Dear Broadcom Inc,')
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (70, 1, CAST(N'2016-02-20T03:00:00.000' AS DateTime), CAST(N'2022-03-30T09:41:23.773' AS DateTime), 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (71, 2, CAST(N'2016-02-25T00:00:00.000' AS DateTime), CAST(N'2022-04-01T15:36:59.307' AS DateTime), 0, 0, NULL, N'Washington', N'US', N'121', NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (72, 3, CAST(N'2016-02-20T04:00:00.000' AS DateTime), CAST(N'2022-03-28T17:57:16.240' AS DateTime), 0, 0, N'day la bai test', N'Quận 7, Hồ Chí Minh, Việt Nam', N'Việt Nam', N'72912', NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (73, 4, CAST(N'2016-02-20T01:00:00.000' AS DateTime), CAST(N'2016-12-20T03:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (74, 6, CAST(N'2016-02-20T02:00:00.000' AS DateTime), CAST(N'2016-12-02T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (75, 7, CAST(N'2016-02-24T00:00:00.000' AS DateTime), CAST(N'2016-12-20T04:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (76, 8, CAST(N'2016-02-20T03:00:00.000' AS DateTime), CAST(N'2022-04-15T11:23:03.170' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (77, 9, CAST(N'2016-02-25T00:00:00.000' AS DateTime), CAST(N'2016-10-05T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (78, 10, CAST(N'2016-02-20T04:00:00.000' AS DateTime), CAST(N'2016-12-20T05:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (79, 7, CAST(N'2016-02-26T00:00:00.000' AS DateTime), CAST(N'2016-09-06T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (80, 3, CAST(N'2016-02-20T01:00:00.000' AS DateTime), CAST(N'2022-04-13T09:48:28.120' AS DateTime), 1, 0, NULL, NULL, NULL, NULL, N'QCOM@abc.com', N'Qualcomm@abc.com', N'', N'Order [ 4 - Qualcomm Inc ]', N'Dear Qualcomm USA,')
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (81, 4, CAST(N'2016-02-23T00:00:00.000' AS DateTime), CAST(N'2022-04-12T16:15:44.670' AS DateTime), 0, 0, NULL, N'Quận 7, Hồ Chí Minh, Việt Nam', N'Việt Nam', NULL, N'000660KRX@abc.com', N'SKHynix@abc.com', N'pham@cc.com', N'Order [ 5 - SK Hynix Inc ]', N'Dear SK Hynix Inc,')
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (82, 5, CAST(N'2016-02-20T02:00:00.000' AS DateTime), CAST(N'2016-04-25T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (83, 6, CAST(N'2016-02-24T00:00:00.000' AS DateTime), CAST(N'2022-04-07T09:09:38.417' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, N'AVGO@abc.com', N'Broadcom@abc.com', N'á@dsa.com', N'Order [ 7 - Broadcom Inc ]', N'Dear Broadcom Inc,')
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (84, 1, CAST(N'2016-02-20T03:00:00.000' AS DateTime), CAST(N'2022-03-30T09:41:23.773' AS DateTime), 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [send_email], [cancel_po], [note], [address], [country], [post_code], [order_send_from_email], [order_send_to_email], [order_send_to_email_cc], [email_subject], [email_content]) VALUES (85, 2, CAST(N'2016-02-25T00:00:00.000' AS DateTime), CAST(N'2022-04-01T15:36:59.307' AS DateTime), 0, 0, NULL, N'Washington', N'US', N'121', NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[purchase_order] OFF
GO
SET IDENTITY_INSERT [dbo].[purchase_order_line] ON 

INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (6, 6, 6, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (11, 11, 1, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (12, 12, 2, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (13, 13, 3, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (14, 14, 4, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (18, 18, 8, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (19, 19, 9, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (20, 20, 10, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (35, 10, 2, CAST(N'2016-02-20T00:00:00.000' AS DateTime), 100, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (36, 10, 3, CAST(N'2016-02-20T00:00:00.000' AS DateTime), 1, 0, 1, 290, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (56, 7, 7, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 1, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (73, 8, 7, CAST(N'2016-02-20T00:00:00.000' AS DateTime), 0, 0, 1, 0, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (74, 8, 10, CAST(N'2016-02-20T00:00:00.000' AS DateTime), 0, 0, 1, 0, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (75, 8, 1, CAST(N'2016-02-20T00:00:00.000' AS DateTime), 0, 0, 1, 0, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (76, 9, 9, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 3, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1082, 4, 2, CAST(N'2016-02-20T00:00:00.000' AS DateTime), 0, 0, 1, 0, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1104, 44, 2, CAST(N'2016-02-24T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1105, 5, 5, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 6, 0, 1, 1.21, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1106, 5, 1, CAST(N'2016-02-23T00:00:00.000' AS DateTime), 1, 0, 1, 12, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1107, 5, 2, CAST(N'2016-02-23T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1109, 47, 1, CAST(N'2016-02-20T00:00:00.000' AS DateTime), 0, 0, 1, 0, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1110, 60, 1, CAST(N'2016-02-25T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1111, 60, 2, CAST(N'2016-02-25T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1114, 56, 1, CAST(N'2016-02-23T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1115, 56, 2, CAST(N'2016-02-23T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1116, 56, 3, CAST(N'2016-02-23T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1119, 17, 7, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 0, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1144, 3, 3, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 1221, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1145, 3, 1, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 1, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1146, 3, 2, CAST(N'2016-02-22T00:00:00.000' AS DateTime), 1, 0, 1, 123, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1147, 3, 4, CAST(N'2016-02-22T00:00:00.000' AS DateTime), 1, 0, 1, 13, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1148, 2, 1, CAST(N'2016-02-21T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1149, 2, 8, CAST(N'2016-02-21T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1150, 2, 2, CAST(N'2016-02-21T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1151, 2, 4, CAST(N'2016-02-21T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1152, 2, 3, CAST(N'2016-02-21T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1153, 16, 6, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 1, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1154, 16, 1, CAST(N'2016-02-25T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1155, 1, 1, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 1, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1156, 1, 2, CAST(N'2016-02-20T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1157, 1, 3, CAST(N'2016-02-20T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1159, 50, 1, CAST(N'2016-02-24T00:00:00.000' AS DateTime), 0, 0, 1, 0, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1160, 50, 2, CAST(N'2016-02-24T00:00:00.000' AS DateTime), 0, 0, 1, 0, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1161, 50, 3, CAST(N'2016-02-24T00:00:00.000' AS DateTime), 0, 0, 1, 0, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1162, 49, 1, CAST(N'2016-02-20T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1163, 49, 2, CAST(N'2016-02-20T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1164, 49, 3, CAST(N'2016-02-20T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1168, 48, 1, CAST(N'2016-02-20T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1169, 48, 3, CAST(N'2016-02-20T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1171, 15, 5, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 1, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1172, 15, 1, CAST(N'2016-02-20T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
INSERT [dbo].[purchase_order_line] ([id], [id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1173, 15, 2, CAST(N'2016-02-20T00:00:00.000' AS DateTime), 1, 0, 1, 1, N'', 1)
SET IDENTITY_INSERT [dbo].[purchase_order_line] OFF
GO
SET IDENTITY_INSERT [dbo].[supplier] ON 

INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (1, N'INTEL', N'Intel Corporation', N'INTC', N'Intel Corporation')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (2, N'Samsung', N'Samsung Semiconductor', N'005930KRX', N'Samsung Electronics Co Ltd')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (3, N'Qualcomm', N'Qualcomm USA', N'QCOM', N'Qualcomm Inc')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (4, N'SKHynix', N'SK Hynix Inc', N'000660KRX', N'SK Hynix Inc')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (5, N'TexasIns', N'Texas Instruments', N'TXN', N'Texas Instruments Incorporated')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (6, N'Broadcom', N'Broadcom Inc', N'AVGO', N'Broadcom Inc')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (7, N'Micron', N'Micron Technology', N'MU', N'Micron Technology')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (8, N'TE', N'TE Connectivity', N'TEL', N'TEL')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (9, N'TDK', N'TDK Cor', N'6762TYO', N'TDK Corp')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (10, N'MediaTek', N'Media Tek Inc', N'2454TPE', N'Media Tek Inc')
SET IDENTITY_INSERT [dbo].[supplier] OFF
GO
SET IDENTITY_INSERT [dbo].[user] ON 

INSERT [dbo].[user] ([id], [username], [password], [token]) VALUES (1, N'admin@gmail.com', N'1234', N'a')
INSERT [dbo].[user] ([id], [username], [password], [token]) VALUES (2, N'sup@gmail.com', N'1234', N'a')
SET IDENTITY_INSERT [dbo].[user] OFF
GO
ALTER TABLE [dbo].[purchase_order] ADD  CONSTRAINT [DF_purchase_order_sent_email]  DEFAULT ((0)) FOR [send_email]
GO
ALTER TABLE [dbo].[purchase_order] ADD  CONSTRAINT [DF_purchase_order_cancel_po]  DEFAULT ((0)) FOR [cancel_po]
GO
ALTER TABLE [dbo].[purchase_order_line] ADD  CONSTRAINT [DF_purchase_order_line_qty_order]  DEFAULT ((1)) FOR [qty_ordered]
GO
ALTER TABLE [dbo].[purchase_order_line] ADD  CONSTRAINT [DF_purchase_order_line_qty_delivered]  DEFAULT ((0)) FOR [qty_delivered]
GO
ALTER TABLE [dbo].[purchase_order_line] ADD  CONSTRAINT [DF_purchase_order_line_back_order]  DEFAULT ((1)) FOR [back_order]
GO
ALTER TABLE [dbo].[purchase_order_line] ADD  CONSTRAINT [DF_purchase_order_line_status]  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[purchase_order]  WITH CHECK ADD  CONSTRAINT [FK_purchase_order_supplier] FOREIGN KEY([id_supplier])
REFERENCES [dbo].[supplier] ([id])
GO
ALTER TABLE [dbo].[purchase_order] CHECK CONSTRAINT [FK_purchase_order_supplier]
GO
ALTER TABLE [dbo].[purchase_order_line]  WITH CHECK ADD  CONSTRAINT [FK_purchase_order_line_part] FOREIGN KEY([id_part])
REFERENCES [dbo].[part] ([id])
GO
ALTER TABLE [dbo].[purchase_order_line] CHECK CONSTRAINT [FK_purchase_order_line_part]
GO
ALTER TABLE [dbo].[purchase_order_line]  WITH CHECK ADD  CONSTRAINT [FK_purchase_order_line_purchase_order] FOREIGN KEY([id_purchase_order])
REFERENCES [dbo].[purchase_order] ([order_no])
GO
ALTER TABLE [dbo].[purchase_order_line] CHECK CONSTRAINT [FK_purchase_order_line_purchase_order]
GO
USE [master]
GO
ALTER DATABASE [purchaseorder] SET  READ_WRITE 
GO
